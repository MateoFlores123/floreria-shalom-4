import { Hono } from "hono";
import { optionalAuth, requireAuth, requireAdmin } from "../lib/auth.js";
import { getProducts, hasPrice } from "../lib/catalog.js";
import { deliveryFor } from "../lib/delivery.js";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import { getWhatsAppNumber } from "../lib/whatsappSchedule.js";
import { getOrder, saveOrder, listOrders, savePhoto, removePhoto, findUserById, phoneKey } from "../lib/db.js";

const orders = new Hono();

const VALID_STATUSES = ["En preparación", "En camino", "Entregado"];
const VALID_PAYMENT_STATUSES = ["Pendiente", "Pago aceptado", "Pago rechazado"];
// Estos estados requieren el pago confirmado, para no despachar pedidos sin pagar
const STATUSES_REQUIRE_PAYMENT = ["En camino", "Entregado"];
const PAYMENT_METHODS = ["Yape", "Transferencia bancaria"];
const MAX_QTY = 50;

function generateOrderCode() {
  const random = 1000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000);
  const stamp = Date.now().toString().slice(-4);
  return `FH4-${stamp}${random}`;
}

const body = (c) => c.req.json().catch(() => ({}));

// ---------------------------------------------------------------
// POST /api/orders  -> crea un pedido desde la web (invitado o con cuenta)
// ---------------------------------------------------------------
orders.post("/", optionalAuth, async (c) => {
  const { items, customer, deliveryDate, deliveryTime, dedication, paymentMethod, acceptedTerms, termsVersion } =
    await body(c);

  if (!Array.isArray(items) || items.length === 0) return c.json({ error: "El carrito está vacío" }, 400);
  if (!customer || !customer.name || !customer.phone || !customer.district || !customer.address) {
    return c.json({ error: "Faltan datos de entrega del cliente" }, 400);
  }
  if (!deliveryDate || !deliveryTime) return c.json({ error: "Selecciona fecha y hora de entrega" }, 400);

  // El costo del delivery depende del distrito (catalog/delivery.json)
  const delivery = deliveryFor(customer.district);
  if (!delivery) return c.json({ error: "Selecciona un distrito de la lista." }, 400);
  if (acceptedTerms !== true) {
    return c.json({ error: "Debes aceptar los términos y condiciones para enviar tu pedido." }, 400);
  }
  if (!PAYMENT_METHODS.includes(paymentMethod)) return c.json({ error: "Selecciona un método de pago válido" }, 400);

  const products = getProducts();
  const resolvedItems = [];
  for (const it of items) {
    const product = products.find((p) => p.id === it.productId && p.active !== false);
    if (!product) return c.json({ error: "Uno de los productos ya no está disponible. Revisa tu carrito." }, 400);
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(it.qty)) || 1));
    const existing = resolvedItems.find((r) => r.productId === product.id);
    if (existing) {
      existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    } else {
      // price null = precio por confirmar por WhatsApp
      resolvedItems.push({ productId: product.id, name: product.name, price: hasPrice(product) ? product.price : null, qty });
    }
  }

  const subtotal = resolvedItems.reduce((sum, it) => sum + (it.price ? it.price * it.qty : 0), 0);
  const deliveryFee = delivery.fee; // null = por confirmar
  const now = new Date().toISOString();
  const user = c.get("user");

  const order = {
    code: generateOrderCode(),
    userId: user ? user.id : null,
    items: resolvedItems,
    subtotal,
    pendingPrices: resolvedItems.some((it) => it.price === null) || deliveryFee === null,
    deliveryFee,
    deliveryZone: delivery.zone,
    total: subtotal + (deliveryFee || 0),
    customer: {
      name: String(customer.name).trim(),
      phone: String(customer.phone).trim(),
      district: customer.district,
      address: String(customer.address).trim(),
      reference: customer.reference || "",
    },
    deliveryDate,
    deliveryTime,
    dedication: dedication || "",
    paymentMethod,
    // Registro de la aceptación de términos y condiciones
    termsAccepted: true,
    termsVersion: String(termsVersion || "1.0"),
    termsAcceptedAt: now,
    status: "En preparación",
    statusHistory: [{ status: "En preparación", date: now }],
    paymentStatus: "Pendiente",
    paymentStatusHistory: [{ status: "Pendiente", date: now }],
    createdAt: now,
  };

  await saveOrder(c.env.DB, order);
  // El número depende de la hora en Lima (src/lib/whatsappSchedule.js)
  const whatsappUrl = buildWhatsAppUrl(getWhatsAppNumber(), order);
  return c.json({ order, whatsappUrl }, 201);
});

// ---------------------------------------------------------------
// GET /api/orders/track?code=FH4-1234&phone=987654321  -> seguimiento
// ---------------------------------------------------------------
orders.get("/track", async (c) => {
  const code = String(c.req.query("code") || "").trim();
  const phone = c.req.query("phone");
  if (!code || !phone) return c.json({ error: "Ingresa el código de pedido y el teléfono" }, 400);
  const row = await c.env.DB.prepare("SELECT data FROM orders WHERE code = ? COLLATE NOCASE AND phone_key = ?")
    .bind(code, phoneKey(phone))
    .first();
  if (!row) return c.json({ error: "No encontramos un pedido con esos datos" }, 404);
  return c.json(JSON.parse(row.data));
});

// ---------------------------------------------------------------
// GET /api/orders/mine  -> pedidos del cliente con sesión
// Incluye los hechos con su cuenta y los que la florería registró con su celular
// ---------------------------------------------------------------
orders.get("/mine", requireAuth, async (c) => {
  const me = await findUserById(c.env.DB, c.get("user").id);
  const list = await listOrders(c.env.DB, "WHERE user_id = ? OR (? <> '' AND phone_key = ?)", [
    c.get("user").id,
    me ? me.phone_key : "",
    me ? me.phone_key : "",
  ]);
  return c.json(list);
});

// ===============================================================
//  Rutas del panel admin
// ===============================================================

// GET /api/orders  -> todos los pedidos
orders.get("/", requireAdmin, async (c) => c.json(await listOrders(c.env.DB)));

// POST /api/orders/custom  -> pedido personalizado (ideas que llegan por WhatsApp)
orders.post("/custom", requireAdmin, async (c) => {
  const { description, price, deliveryFee, customer, deliveryDate, deliveryTime, dedication, paymentMethod, image } =
    await body(c);

  if (!description || !String(description).trim()) {
    return c.json({ error: "Describe el arreglo (en qué consiste el pedido)." }, 400);
  }
  const priceNum = Number(price);
  if (!Number.isFinite(priceNum) || priceNum <= 0) return c.json({ error: "Ingresa el precio del arreglo." }, 400);
  const feeNum = Number(deliveryFee || 0);
  if (!Number.isFinite(feeNum) || feeNum < 0) return c.json({ error: "El costo de delivery no es válido." }, 400);
  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return c.json({ error: "Completa nombre, celular y dirección del cliente." }, 400);
  }
  if (phoneKey(customer.phone).length < 9) {
    return c.json({ error: "El celular del cliente debe tener 9 dígitos." }, 400);
  }

  let referencePhoto = null;
  if (image) {
    try {
      referencePhoto = await savePhoto(c.env.DB, image);
    } catch (err) {
      return c.json({ error: err.message }, 400);
    }
  }

  const zone = customer.district ? deliveryFor(customer.district) : null;
  const now = new Date().toISOString();
  const order = {
    code: generateOrderCode(),
    source: "personalizado",
    userId: null,
    items: [{ productId: "personalizado", name: String(description).trim(), price: priceNum, qty: 1 }],
    subtotal: priceNum,
    pendingPrices: false,
    deliveryFee: feeNum,
    deliveryZone: zone ? zone.zone : null,
    total: priceNum + feeNum,
    customer: {
      name: String(customer.name).trim(),
      phone: String(customer.phone).trim(),
      district: customer.district || "",
      address: String(customer.address).trim(),
      reference: customer.reference || "",
    },
    deliveryDate: deliveryDate || "",
    deliveryTime: deliveryTime || "",
    dedication: dedication || "",
    paymentMethod: PAYMENT_METHODS.includes(paymentMethod) ? paymentMethod : "Yape",
    referencePhoto,
    status: "En preparación",
    statusHistory: [{ status: "En preparación", date: now }],
    paymentStatus: "Pendiente",
    paymentStatusHistory: [{ status: "Pendiente", date: now }],
    createdAt: now,
  };

  await saveOrder(c.env.DB, order);
  return c.json(order, 201);
});

// PATCH /api/orders/:code/status  -> estado de entrega
orders.patch("/:code/status", requireAdmin, async (c) => {
  const { status } = await body(c);
  if (!VALID_STATUSES.includes(status)) return c.json({ error: "Estado inválido" }, 400);
  const order = await getOrder(c.env.DB, c.req.param("code"));
  if (!order) return c.json({ error: "Pedido no encontrado" }, 404);
  if (STATUSES_REQUIRE_PAYMENT.includes(status) && order.paymentStatus !== "Pago aceptado") {
    return c.json(
      { error: `No puedes pasar a "${status}" sin confirmar el pago primero. Marca "Pago aceptado" antes de continuar.` },
      400
    );
  }
  order.status = status;
  order.statusHistory = [...(order.statusHistory || []), { status, date: new Date().toISOString() }];
  return c.json(await saveOrder(c.env.DB, order));
});

// PATCH /api/orders/:code/payment-status  -> estado del pago
orders.patch("/:code/payment-status", requireAdmin, async (c) => {
  const { paymentStatus } = await body(c);
  if (!VALID_PAYMENT_STATUSES.includes(paymentStatus)) return c.json({ error: "Estado de pago inválido" }, 400);
  const order = await getOrder(c.env.DB, c.req.param("code"));
  if (!order) return c.json({ error: "Pedido no encontrado" }, 404);
  order.paymentStatus = paymentStatus;
  order.paymentStatusHistory = [...(order.paymentStatusHistory || []), { status: paymentStatus, date: new Date().toISOString() }];
  return c.json(await saveOrder(c.env.DB, order));
});

// POST /api/orders/:code/delivery-photo  { image: "data:image/jpeg;base64,..." }
orders.post("/:code/delivery-photo", requireAdmin, async (c) => {
  const order = await getOrder(c.env.DB, c.req.param("code"));
  if (!order) return c.json({ error: "Pedido no encontrado" }, 404);
  if (order.status !== "Entregado") {
    return c.json({ error: 'Primero marca el pedido como "Entregado" para subir la foto.' }, 400);
  }
  let photo;
  try {
    photo = await savePhoto(c.env.DB, (await body(c)).image);
  } catch (err) {
    return c.json({ error: err.message }, 400);
  }
  await removePhoto(c.env.DB, order.deliveryPhoto);
  order.deliveryPhoto = photo;
  return c.json(await saveOrder(c.env.DB, order));
});

// DELETE /api/orders/:code/delivery-photo  -> quita la foto
orders.delete("/:code/delivery-photo", requireAdmin, async (c) => {
  const order = await getOrder(c.env.DB, c.req.param("code"));
  if (!order) return c.json({ error: "Pedido no encontrado" }, 404);
  await removePhoto(c.env.DB, order.deliveryPhoto);
  delete order.deliveryPhoto;
  return c.json(await saveOrder(c.env.DB, order));
});

export default orders;
