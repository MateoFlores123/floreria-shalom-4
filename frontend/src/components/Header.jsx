import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CartIcon, UserIcon, MenuIcon, CloseIcon } from "./icons";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/seguimiento", label: "Seguir pedido" },
  { to: "/nosotros", label: "Nosotros" },
];

export default function Header() {
  const { totals, openCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Floreria Shalom 4 — inicio">
          <img src="/images/brand/logo.png" alt="Floreria Shalom 4" className="brand__logo" />
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="nav-toggle icon-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <Link
            to={isLoggedIn ? "/mis-pedidos" : "/cuenta"}
            className="icon-btn"
            aria-label="Mi cuenta"
            title={isLoggedIn ? `Hola, ${user?.name?.split(" ")[0]}` : "Ingresar"}
          >
            <UserIcon />
          </Link>

          <button className="icon-btn" onClick={openCart} aria-label="Ver carrito">
            <CartIcon />
            {totals.count > 0 && <span className="cart-badge">{totals.count}</span>}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="main-nav main-nav--mobile"
          style={{ flexDirection: "column", padding: "0 24px 20px", gap: 16 }}
          aria-label="Navegación móvil"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
