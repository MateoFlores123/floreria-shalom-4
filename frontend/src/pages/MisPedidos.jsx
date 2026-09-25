import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";
import { paymentBadgeClass } from "../utils/orderStatus";

export default function MisPedidos() {
  const { isLoggedIn, loading: authLoading, token, user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api
      .get("/orders/mine", { token })
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token]);

  if (authLoading) return null;
  if (!isLoggedIn) return <Navigate to="/cuenta" replace />;

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 72 }}>
      <div className="page-hero" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1>Hola, {user?.name?.split(" ")[0]} 👋</h1>
          <p>Este es el historial de tus pedidos en Floreria Shalom 4.</p>
        </div>
        <button className="btn btn-ghost" onClick={logout}>Cerrar sesión</button>
      </div>

      {loading && <p className="muted" style={{ marginTop: 24 }}>Cargando pedidos…</p>}

      {!loading && orders.length === 0 && (
        <div className="card" style={{ marginTop: 24, textAlign: "center" }}>
          <p className="muted">Todavía no tienes pedidos.</p>
          <Link to="/catalogo" className="btn btn-primary" style={{ marginTop: 14 }}>Ver catálogo</Link>
        </div>
      )}

      <div className="stack" style={{ marginTop: 24 }}>
        {orders.map((order) => (
          <div className="card" key={order.code}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ fontWeight: 700, color: "var(--green-dark)" }}>{order.code}</p>
                <p className="muted" style={{ fontSize: "0.85rem" }}>
                  {new Date(order.createdAt).toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className={`badge ${paymentBadgeClass(order.paymentStatus)}`}>
                  {order.paymentStatus || "Pendiente"}
                </span>
                <span className="badge">{order.status}</span>
              </div>
            </div>
            <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: "0.92rem", color: "var(--ink-soft)" }}>
              {order.items.map((it) => (
                <li key={it.productId}>{it.qty} x {it.name}</li>
              ))}
            </ul>
            <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Total: S/ {order.total.toFixed(2)}</strong>
              <Link className="btn btn-ghost" to={`/seguimiento?code=${order.code}&phone=${order.customer.phone}`}>
                Ver seguimiento →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
