import { Link } from "react-router-dom";
import { TermsContent } from "../components/Terms";

export default function Terminos() {
  return (
    <div className="container terms-page">
      <div className="page-hero">
        <h1>Términos y condiciones</h1>
        <p>Lo que debes saber antes de hacer tu pedido en Florería Shalom.</p>
      </div>
      <TermsContent />
      <div className="terms-page__back">
        <Link to="/catalogo" className="btn btn-primary">Ver el catálogo</Link>
      </div>
    </div>
  );
}