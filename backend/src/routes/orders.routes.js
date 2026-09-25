const express = require("express");
const crypto = require("crypto");
const { getCollection, saveCollection } = require("../db");
const { optionalAuth, requireAuth, requireAdmin } = require("../middleware/auth");
const { buildWhatsAppUrl } = require("../utils/whatsapp");

const router = express.Router();

const VALID_STATUSES = ["En preparación", "En camino", "Entregado"];
const VALID_PAYMENT_STATUSES = ["Pendiente", "Pago aceptado", "Pago rechazado"];
// Estos estados de entrega requieren que el pago ya esté confirmado,
// para no despachar pedidos que no se han pagado (o cuyo pago fue rechazado).
const STATUSES_REQUIRE_PAYMENT = ["En camino", "Entregado"];
const DELIVERY_FEE = Number(process.env.DEFAULT_DELIVERY_FEE || 10);
const OWNER_WHATSAPP_NUMBER = process.env.OWNER_WHATSAPP_NUMBER || "51900000000";

function generateOrderCode() {
  const random = crypto.randomInt(1000, 9999);
  const stamp = Date.now().toString().slice(-4);
  return `FH4-${stamp}${random}`;
}

// POST /api/orders  -> crea un pedido nuevo (invitado o usuario logueado)
router.post("/", optionalAuth, (req, res) => {
  const { items, customer, deliveryDate, deliveryTime, dedication, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }
  if (!customer || !customer.name || !customer.phone || !customer.district || !customer.address) {
    return res.status(400).json({ error: "Faltan datos de entrega del cliente" });
  }
  if (!deliveryDate || !deliveryTime) {
    return res.status(400).json({ error: "Selecciona fecha y hora de entrega" });
  }
  if (!paymentMethod || !["Yape", "Transferencia bancaria"].includes(paymentMethod)) {
    return res.status(400).json({ error: "Selecciona un método de pago válido" });
  }

  const products = getCollection("products");
  const resolvedItems = items.map((it) => {
    const product = products.find((p) => p.id === it.productId);
    if (!product) throw new Error(`Producto no encontrado: ${it.productId}`);
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: Math.max(1, Number(it.qty) || 1),
    };
  });

  const subtotal = resolvedItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const deliveryFee = DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const order = {
    code: generateOrderCode(),
    userId: req.user ? req.user.id : null,
    items: resolvedItems,
    subtotal,
    deliveryFee,
    total,
    customer,
    deliveryDate,
    deliveryTime,
    dedication: dedication || "",
    paymentMethod,
    status: "En preparación",
    statusHistory: [{ status: "En preparación", date: new Date().toISOString() }],
    paymentStatus: "Pendiente",
    paymentStatusHistory: [{ status: "Pendiente", date: new Date().toISOString() }],
    createdAt: new Date().toISOString(),
  };

  const orders = getCollection("orders");
  orders.push(order);
  saveCollection("orders", orders);

  const whatsappUrl = buildWhatsAppUrl(OWNER_WHATSAPP_NUMBER, order);

  res.status(201).json({ order, whatsappUrl });
});

// GET /api/orders/track?code=FH4-1234&phone=987654321  -> seguimiento para invitados y usuarios
router.get("/track", (req, res) => {
  const { code, phone } = req.query;
  if (!code || !phone) {
    return res.status(400).json({ error: "Ingresa el código de pedido y el teléfono" });
  }
  const orders = getCollection("orders");
  const order = orders.find(
    (o) => o.code.toLowerCase() === String(code).toLowerCase() && o.customer.phone === phone
  );
  if (!order) {
    return res.status(404).json({ error: "No encontramos un pedido con esos datos" });
  }
  res.json(order);
});

// GET /api/orders/mine  -> pedidos del usuario logueado
router.get("/mine", requireAuth, (req, res) => {
  const orders = getCollection("orders").filter((o) => o.userId === req.user.id);
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// --- Rutas de administración (panel interno de la florería) ---

// GET /api/orders  -> lista todos los pedidos (admin)
router.get("/", requireAdmin, (req, res) => {
  const orders = getCollection("orders");
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// PATCH /api/orders/:code/status  -> actualiza el estado de entrega de un pedido (admin)
router.patch("/:code/status", requireAdmin, (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: "Estado inválido" });
  }
  const orders = getCollection("orders");
  const order = orders.find((o) => o.code === req.params.code);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

  if (STATUSES_REQUIRE_PAYMENT.includes(status) && order.paymentStatus !== "Pago aceptado") {
    return res.status(400).json({
      error: `No puedes pasar a "${status}" sin confirmar el pago primero. Marca "Pago aceptado" antes de continuar.`,
    });
  }

  order.status = status;
  order.statusHistory.push({ status, date: new Date().toISOString() });
  saveCollection("orders", orders);

  res.json(order);
});

// PATCH /api/orders/:code/payment-status  -> actualiza el estado del pago (admin)
router.patch("/:code/payment-status", requireAdmin, (req, res) => {
  const { paymentStatus } = req.body;
  if (!VALID_PAYMENT_STATUSES.includes(paymentStatus)) {
    return res.status(400).json({ error: "Estado de pago inválido" });
  }
  const orders = getCollection("orders");
  const order = orders.find((o) => o.code === req.params.code);
  if (!order) return res.status(404).json({ error: "Pedido no encontrado" });

  order.paymentStatus = paymentStatus;
  if (!order.paymentStatusHistory) order.paymentStatusHistory = [];
  order.paymentStatusHistory.push({ status: paymentStatus, date: new Date().toISOString() });
  saveCollection("orders", orders);

  res.json(order);
});

module.exports = router;
