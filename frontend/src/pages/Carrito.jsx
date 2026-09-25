import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { AREQUIPA_DISTRICTS, DELIVERY_TIME_SLOTS } from "../data/site";
import { PlusIcon, MinusIcon, TrashIcon, WhatsAppIcon } from "../components/icons";

const DELIVERY_FEE = 10;

export default function Carrito() {
  const { items, totals, updateQty, removeItem, clearCart } = useCart();
  const { user, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    district: AREQUIPA_DISTRICTS[0],
    address: "",
    reference: "",
    deliveryDate: "",
    deliveryTime: DELIVERY_TIME_SLOTS[0],
    dedication: "",
    paymentMethod: "Yape",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }
    if (!form.name || !form.phone || !form.address || !form.deliveryDate) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: items.map((it) => ({ productId: it.productId, qty: it.qty })),
        customer: {
          name: form.name,
          phone: form.phone,
          district: form.district,
          address: form.address,
          reference: form.reference,
        },
        deliveryDate: form.deliveryDate,
        deliveryTime: form.deliveryTime,
        dedication: form.dedication,
        paymentMethod: form.paymentMethod,
      };
      const data = await api.post("/orders", payload, isLoggedIn ? { token } : {});
      setResult(data);
      clearCart();
    } catch (err) {
      setError(err.message || "No pudimos crear tu pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="container center-max" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <span className="badge">Pedido creado</span>
          <h1 style={{ marginTop: 16, fontSize: "1.8rem" }}>¡Ya casi está listo, {form.name.split(" ")[0]}!</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Tu código de pedido es <strong>{result.order.code}</strong>. Guárdalo para hacer seguimiento.
          </p>
          <p className="muted" style={{ marginTop: 8 }}>
            Total a pagar: <strong>S/ {result.order.total.toFixed(2)}</strong> ({form.paymentMethod})
          </p>
          <p style={{ marginTop: 20 }}>
            Para confirmar tu pedido y coordinar el pago, envíanos el resumen por WhatsApp:
          </p>
          <a
            className="btn btn-accent"
            style={{ marginTop: 14, background: "#25d366" }}
            href={result.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={20} /> Confirmar pedido por WhatsApp
          </a>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link to={`/seguimiento?code=${result.order.code}&phone=${form.phone}`} className="btn btn-outline">
              Ver seguimiento
            </Link>
            <Link to="/catalogo" className="btn btn-ghost">Seguir comprando</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 72 }}>
      <div className="page-hero">
        <h1>Finalizar pedido</h1>
        <p>Revisa tu carrito y cuéntanos dónde y cuándo entregar tus flores.</p>
      </div>

      <div className="two-col" style={{ marginTop: 32 }}>
        <form className="card" onSubmit={handleSubmit}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: 20 }}>Datos de entrega</h2>

          {error && <div className="form-error">{error}</div>}

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Nombre completo *</label>
              <input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="phone">Celular (WhatsApp) *</label>
              <input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="district">Distrito *</label>
              <select id="district" value={form.district} onChange={(e) => update("district", e.target.value)}>
                {AREQUIPA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="address">Dirección exacta *</label>
              <input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="reference">Referencia (opcional)</label>
            <input
              id="reference"
              placeholder="Ej: frente al parque, casa color azul…"
              value={form.reference}
              onChange={(e) => update("reference", e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="date">Fecha de entrega *</label>
              <input
                id="date"
                type="date"
                value={form.deliveryDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => update("deliveryDate", e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="time">Horario preferido *</label>
              <select id="time" value={form.deliveryTime} onChange={(e) => update("deliveryTime", e.target.value)}>
                {DELIVERY_TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="dedication">Mensaje para la tarjeta (opcional)</label>
            <textarea
              id="dedication"
              rows={3}
              placeholder="Escribe aquí la dedicatoria…"
              value={form.dedication}
              onChange={(e) => update("dedication", e.target.value)}
            />
          </div>

          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--green-dark)" }}>
            Método de pago *
          </label>
          <div className="payment-options" style={{ marginTop: 8, marginBottom: 24 }}>
            <div
              className={`payment-option ${form.paymentMethod === "Yape" ? "active" : ""}`}
              onClick={() => update("paymentMethod", "Yape")}
            >
              <div>
                <h4>Yape</h4>
                <p>Escanearás el QR o enviarás al número que te compartamos por WhatsApp.</p>
              </div>
            </div>
            <div
              className={`payment-option ${form.paymentMethod === "Transferencia bancaria" ? "active" : ""}`}
              onClick={() => update("paymentMethod", "Transferencia bancaria")}
            >
              <div>
                <h4>Transferencia bancaria</h4>
                <p>Te enviaremos los datos de la cuenta por WhatsApp para transferir.</p>
              </div>
            </div>
          </div>

          <p className="muted" style={{ fontSize: "0.85rem", marginBottom: 20 }}>
            El pago se confirma directamente por WhatsApp: nosotros te compartimos el número de
            Yape o la cuenta bancaria y tú envías la captura del pago allí mismo.
          </p>

          <button className="btn btn-accent btn-block" type="submit" disabled={loading || items.length === 0}>
            {loading ? "Creando pedido…" : "Continuar a WhatsApp"}
          </button>
        </form>

        <aside className="card">
          <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Resumen del pedido</h2>
          {items.length === 0 && <p className="muted">Aún no agregaste productos.</p>}
          <div className="stack">
            {items.map((item) => (
              <div className="cart-line" key={item.productId}>
                <div className="cart-line__swatch" style={{ background: item.color || "#c4406b" }} />
                <div>
                  <p className="cart-line__name">{item.name}</p>
                  <p className="cart-line__price">S/ {item.price.toFixed(2)}</p>
                  <div className="qty-stepper" style={{ marginTop: 6 }}>
                    <button type="button" onClick={() => updateQty(item.productId, item.qty - 1)}>
                      <MinusIcon size={14} />
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.productId, item.qty + 1)}>
                      <PlusIcon size={14} />
                    </button>
                  </div>
                </div>
                <button type="button" className="icon-btn" onClick={() => removeItem(item.productId)}>
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>

          {items.length > 0 && (
            <div style={{ marginTop: 20, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span className="muted">Subtotal</span>
                <span>S/ {totals.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span className="muted">Delivery en Arequipa</span>
                <span>S/ {DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="cart-drawer__total">
                <span>Total</span>
                <span>S/ {(totals.subtotal + DELIVERY_FEE).toFixed(2)}</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
