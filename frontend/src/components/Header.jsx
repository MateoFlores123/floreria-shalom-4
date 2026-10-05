import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { SITE } from "../data/site";
import { CartIcon, UserIcon, WhatsAppIcon, ArrowRightIcon } from "./icons";
import { BrandMark } from "./Brand";
import "../styles/header.css";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/seguimiento", label: "Seguir pedido" },
  { to: "/nosotros", label: "Nosotros" },
];

// Mensajes de la franja superior (se desplazan en bucle).
const ANNOUNCEMENTS = [
  "Entrega el mismo día en Arequipa",
  "Paga con Yape o transferencia",
  "Agrega una dedicatoria a tu pedido",
  "Confirma tu pedido por WhatsApp",
];

export default function Header() {
  const { totals, openCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú del celular al cambiar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Cierra el menú con Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const accountTo = isLoggedIn ? "/mis-pedidos" : "/cuenta";
  const accountLabel = isLoggedIn ? `Hola, ${user?.name?.split(" ")[0] || ""}` : "Ingresar";
  const waLink = `https://wa.me/${SITE.whatsappNumber}`;

  // Se repite la lista para que el desplazamiento sea continuo
  const ticker = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <header className={`masthead ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}`}>
      <div className="masthead__bar" aria-label="Avisos">
        <div className="masthead__ticker">
          {ticker.map((text, i) => (
            <span key={i} aria-hidden={i >= ANNOUNCEMENTS.length}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="masthead__main">
        <div className="masthead__inner">
          <Link to="/" className="masthead__brand" aria-label={`${SITE.brand}, ir al inicio`}>
            <span className="masthead__mark">
              <BrandMark />
            </span>
            <span className="masthead__name">
              <strong>
                FloreríaShalom4
              </strong>
              <small>Flores y detalles en Arequipa</small>
            </span>
          </Link>

          <nav className="masthead__nav" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className="masthead__link">
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="masthead__actions">
            <a href={waLink} target="_blank" rel="noreferrer" className="masthead__wa">
              <WhatsAppIcon size={18} />
              <span>Escríbenos</span>
            </a>

            <Link to={accountTo} className="masthead__icon" aria-label={accountLabel} title={accountLabel}>
              <UserIcon />
            </Link>

            <button type="button" className="masthead__cart" onClick={openCart} aria-label={`Ver carrito, ${totals.count} productos`}>
              <CartIcon />
              <span className="masthead__cart-label">Carrito</span>
              {totals.count > 0 && (
                <span className="masthead__badge" key={totals.count}>
                  {totals.count}
                </span>
              )}
            </button>

            <button
              type="button"
              className="masthead__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="masthead-panel"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* Menú del celular a pantalla completa */}
      <div id="masthead-panel" className="masthead__panel" aria-hidden={!menuOpen}>
        <BrandMark className="masthead__panel-mark" />
        <nav className="masthead__panel-nav" aria-label="Navegación móvil">
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              style={{ "--i": i }}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
              <ArrowRightIcon size={20} />
            </NavLink>
          ))}
        </nav>
        <div className="masthead__panel-foot" style={{ "--i": NAV_LINKS.length }}>
          <Link to={accountTo} className="btn btn-outline" tabIndex={menuOpen ? 0 : -1}>
            <UserIcon size={18} /> {isLoggedIn ? "Mis pedidos" : "Ingresar a mi cuenta"}
          </Link>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" tabIndex={menuOpen ? 0 : -1}>
            <WhatsAppIcon size={18} /> Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}