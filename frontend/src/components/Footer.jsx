import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";
import { MEDIA } from "../data/media";

export default function Footer() {
  return (
    <footer className="site-footer">
      <section className="footer-cta">
        <div className="container footer-cta__inner">
          <div>
            <span className="eyebrow footer-cta__eyebrow">Flores para recordar</span>
            <h2>Un detalle bonito cambia el día.</h2>
            <p>
              Elige tu arreglo, cuéntanos la ocasión y nosotros nos encargamos de que llegue
              presentado con cuidado.
            </p>
          </div>
          <div className="footer-cta__action">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-light"
            >
              <WhatsAppIcon size={18} />
              Hablar por WhatsApp
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </div>
      </section>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-slot">
              <img
                src={MEDIA.brand.logo}
                alt={SITE.brand}
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              <span>LOGO DE FLORERÍA</span>
            </div>
            <p>
              Arreglos y ramos preparados con cuidado, con atención personalizada y entrega en
              Arequipa.
            </p>
          </div>

          <div>
            <h4>Explorar</h4>
            <ul>
              <li><Link to="/catalogo">Catálogo completo</Link></li>
              <li><Link to="/catalogo?ocasion=Amor">Amor y aniversarios</Link></li>
              <li><Link to="/catalogo?ocasion=Cumpleaños">Cumpleaños</Link></li>
              <li><Link to="/catalogo?ocasion=Condolencias">Condolencias</Link></li>
            </ul>
          </div>

          <div>
            <h4>Ayuda</h4>
            <ul>
              <li><Link to="/seguimiento">Seguir mi pedido</Link></li>
              <li><Link to="/cuenta">Mi cuenta</Link></li>
              <li><Link to="/carrito">Mi carrito</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contacto</h4>
            <div className="footer-contact">
              <strong>{SITE.whatsappDisplay}</strong>
              <span>{SITE.address}</span>
              <span>{SITE.hours}</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {SITE.brand} · {SITE.city} · Todos los derechos reservados</span>
        <div className="payment-badges">
          <span>Yape</span>
          <span>Transferencia bancaria</span>
        </div>
      </div>
    </footer>
  );
}
