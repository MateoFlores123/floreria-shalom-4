import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cuenta() {
  const [tab, setTab] = useState("login");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      navigate("/mis-pedidos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(regForm);
      navigate("/mis-pedidos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container center-max" style={{ paddingTop: 48, paddingBottom: 72 }}>
      <div className="page-hero" style={{ textAlign: "center" }}>
        <h1>Mi cuenta</h1>
        <p style={{ margin: "10px auto 0" }}>
          Crea una cuenta para ver el historial de tus pedidos, o continúa como invitado y compra igual.
        </p>
      </div>

      <div className="card" style={{ marginTop: 28 }}>
        <div className="tabs">
          <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>
            Ingresar
          </button>
          <button className={`tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>
            Crear cuenta
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
              />
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="field">
              <label htmlFor="reg-name">Nombre completo</label>
              <input
                id="reg-name"
                required
                value={regForm.name}
                onChange={(e) => setRegForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="reg-email">Correo electrónico</label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={regForm.email}
                  onChange={(e) => setRegForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="reg-phone">Celular</label>
                <input
                  id="reg-phone"
                  required
                  value={regForm.phone}
                  onChange={(e) => setRegForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="reg-password">Contraseña</label>
              <input
                id="reg-password"
                type="password"
                required
                minLength={6}
                value={regForm.password}
                onChange={(e) => setRegForm((f) => ({ ...f, password: e.target.value }))}
              />
            </div>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
          <p className="muted" style={{ marginBottom: 10 }}>¿Prefieres no crear una cuenta?</p>
          <button className="btn btn-outline" onClick={() => navigate("/catalogo")}>
            Continuar como invitado
          </button>
        </div>
      </div>
    </div>
  );
}
