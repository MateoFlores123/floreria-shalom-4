import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container center-max" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem" }}>Esta página se marchitó 🥀</h1>
      <p className="muted" style={{ marginTop: 12 }}>No encontramos lo que buscabas.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Volver al inicio</Link>
    </div>
  );
}
