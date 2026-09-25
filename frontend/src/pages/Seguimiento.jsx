import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import StatusStepper from "../components/StatusStepper";
import { paymentBadgeClass } from "../utils/orderStatus";

export default function Seguimiento() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!code || !phone) {
      setError("Ingresa el código de pedido y el teléfono con el que compraste.");
      return;
    }
    setLoading(true);
    try {
      const data = await api.get(`/orders/track?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchParams.get("code") && searchParams.get("phone")) {
      handleSearch({ preventDefault() {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container center-max" style={{ paddingTop: 48, paddingBottom: 72 }}>
      <div className="page-hero" style={{ textAlign: "center" }}>
        <h1>Sigue tu pedido</h1>
        <p style={{ margin: "10px auto 0" }}>
          Ingresa el código que te enviamos y el número de celular con el que hiciste el pedido.
        </p>
      </div>

      <form className="card" onSubmit={handleSearch} style={{ marginTop: 28 }}>
        {error && <div className="form-error">{error}</div>}
        <div className="field-row">
          <div className="field">
            <label htmlFor="code">Código de pedido</label>
            <input id="code" placeholder="FH4-1234" value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="phone">Celular usado en el pedido</label>
            <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Buscando…" : "Ver estado del pedido"}
        </button>
      </form>

      {order && (
        <div className="card" style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <p style={{ fontWeight: 700, color: "var(--green-dark)" }}>Pedido {order.code}</p>
              <p className="muted" style={{ fontSize: "0.85rem" }}>
                Entrega programada: {order.deliveryDate} · {order.deliveryTime}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className={`badge ${paymentBadgeClass(order.paymentStatus)}`}>
                {order.paymentStatus || "Pendiente"}
              </span>
              <span className="badge">{order.status}</span>
            </div>
          </div>

          {order.paymentStatus === "Pago rechazado" && (
            <div className="form-error" style={{ marginTop: 16 }}>
              No pudimos confirmar tu pago. Escríbenos por WhatsApp reenviando tu comprobante
              para poder continuar con tu pedido.
            </div>
          )}

          <StatusStepper status={order.status} />

          <ul style={{ paddingLeft: 18, fontSize: "0.92rem", color: "var(--ink-soft)" }}>
            {order.items.map((it) => (
              <li key={it.productId}>{it.qty} x {it.name}</li>
            ))}
          </ul>
          <p style={{ marginTop: 10, fontWeight: 700 }}>Total: S/ {order.total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
