import { useEffect, useState } from "react";
import { api } from "../api/client";
import { PAYMENT_STATUSES, paymentBadgeClass } from "../utils/orderStatus";

const STATUSES = ["En preparación", "En camino", "Entregado"];
const STATUSES_REQUIRE_PAYMENT = ["En camino", "Entregado"];
const STORAGE_KEY = "halon4_admin_token";

export default function Admin() {
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function loadOrders(token) {
    setLoading(true);
    api
      .get("/orders", { adminToken: token })
      .then(setOrders)
      .catch((err) => {
        setError(err.message);
        setAdminToken("");
        sessionStorage.removeItem(STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (adminToken) loadOrders(adminToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    const token = `${userInput}:${passInput}`;
    sessionStorage.setItem(STORAGE_KEY, token);
    setAdminToken(token);
    loadOrders(token);
  }

  async function updateStatus(code, status) {
    try {
      await api.patch(`/orders/${code}/status`, { status }, { adminToken });
      loadOrders(adminToken);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updatePaymentStatus(code, paymentStatus) {
    try {
      await api.patch(`/orders/${code}/payment-status`, { paymentStatus }, { adminToken });
      loadOrders(adminToken);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!adminToken) {
    return (
      <div className="container center-max" style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="card">
          <h1 style={{ fontSize: "1.5rem" }}>Panel interno</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            Acceso solo para el equipo de Floreria Shalom 4. Este panel es un prototipo: para el
            negocio real conviene reemplazarlo por un login más robusto.
          </p>
          {error && <div className="form-error" style={{ marginTop: 16 }}>{error}</div>}
          <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
            <div className="field">
              <label>Usuario</label>
              <input value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
            </div>
            <div className="field">
              <label>Contraseña</label>
              <input type="password" value={passInput} onChange={(e) => setPassInput(e.target.value)} required />
            </div>
            <button className="btn btn-primary btn-block">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 72 }}>
      <div className="page-hero">
        <h1>Pedidos</h1>
        <p>Actualiza el estado de cada pedido a medida que avanza la preparación y entrega.</p>
      </div>

      {error && <div className="form-error">{error}</div>}
      {loading && <p className="muted">Cargando pedidos…</p>}

      <div className="stack" style={{ marginTop: 20 }}>
        {orders.map((order) => (
          <div className="card" key={order.code}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <p style={{ fontWeight: 700, color: "var(--green-dark)" }}>{order.code}</p>
                <p className="muted" style={{ fontSize: "0.85rem" }}>
                  {order.customer.name} · {order.customer.phone} · {order.customer.district}
                </p>
                <p className="muted" style={{ fontSize: "0.85rem" }}>
                  Entrega: {order.deliveryDate} · {order.deliveryTime}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700 }}>S/ {order.total.toFixed(2)}</p>
                <p className="muted" style={{ fontSize: "0.85rem" }}>{order.paymentMethod}</p>
                <span className={`badge ${paymentBadgeClass(order.paymentStatus)}`} style={{ marginTop: 6 }}>
                  {order.paymentStatus || "Pendiente"}
                </span>
              </div>
            </div>

            <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: "0.9rem", color: "var(--ink-soft)" }}>
              {order.items.map((it) => (
                <li key={it.productId}>{it.qty} x {it.name}</li>
              ))}
            </ul>

            <div style={{ marginTop: 14 }}>
              <p className="muted" style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                Estado del pago
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PAYMENT_STATUSES.map((ps) => (
                  <button
                    key={ps}
                    className={`btn ${
                      (order.paymentStatus || "Pendiente") === ps ? "btn-primary" : "btn-outline"
                    }`}
                    onClick={() => updatePaymentStatus(order.code, ps)}
                  >
                    {ps}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <p className="muted" style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: 6 }}>
                Estado de la entrega
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STATUSES.map((status) => {
                  const locked =
                    STATUSES_REQUIRE_PAYMENT.includes(status) && order.paymentStatus !== "Pago aceptado";
                  return (
                    <button
                      key={status}
                      className={`btn ${order.status === status ? "btn-primary" : "btn-outline"}`}
                      onClick={() => updateStatus(order.code, status)}
                      disabled={locked}
                      title={locked ? 'Primero marca "Pago aceptado" para poder avanzar aquí' : undefined}
                      style={locked ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
              {(order.paymentStatus === "Pendiente" || order.paymentStatus === "Pago rechazado") && (
                <p style={{ fontSize: "0.8rem", color: "var(--pink-dark)", marginTop: 8 }}>
                  ⚠ No se puede pasar a "En camino" ni "Entregado" hasta confirmar el pago.
                </p>
              )}
            </div>
          </div>
        ))}

        {!loading && orders.length === 0 && <p className="muted">Todavía no hay pedidos registrados.</p>}
      </div>
    </div>
  );
}
