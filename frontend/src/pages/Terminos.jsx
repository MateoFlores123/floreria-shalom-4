import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { TermsContent } from "../components/Terms";

export default function Terminos() {
  usePageMeta({
    title: "Términos y condiciones",
    description: "Condiciones de compra, entregas, pagos y fotos referenciales de Florería Shalom & Amor en Arequipa.",
    path: "/terminos",
  });
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