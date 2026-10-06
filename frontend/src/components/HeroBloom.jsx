import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MEDIA } from "../data/media";
import { ArrowRightIcon } from "./icons";
import { BrandMark } from "./Brand";

// Imagen con respaldo: si falla la carga queda un degradé suave.
function BloomImage({ src, alt = "", priority = false }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="bloom__fallback" aria-hidden="true" />;
  return (
    <img
      src={src}
      alt={alt}
      className="bloom__img"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}

// Cada pieza tiene su propia silueta (arco, hoja, óvalo, cápsula…),
// su profundidad para el efecto de movimiento con el mouse y su orden de aparición.
const PIECES = [
  {
    key: "favorites",
    shape: "arch",
    to: "/catalogo",
    src: MEDIA.hero.favorites,
    alt: "Ramo de rosas rojas envuelto en papel blanco",
    label: "Favoritos",
    title: "Los favoritos para regalar.",
    depth: 14,
    priority: true,
  },
  {
    key: "flores",
    shape: "leaf",
    to: "/catalogo",
    src: MEDIA.hero.flores,
    alt: "Caja con rosas amarillas",
    label: "Flores",
    title: "Hechas para regalar.",
    depth: 22,
  },
  {
    key: "temporada",
    shape: "capsule",
    to: "/catalogo?categoria=Girasoles",
    src: MEDIA.hero.temporada,
    alt: "Ramo de girasoles",
    label: "De estación",
    title: "Lo que está floreciendo.",
    depth: 30,
  },
  {
    key: "combos",
    shape: "oval",
    to: "/catalogo?categoria=Combos",
    src: MEDIA.hero.combos,
    alt: "Ramo de rosas con bombones",
    label: "Combos",
    title: "Para sorprender.",
    depth: 18,
  },
  {
    key: "detalles",
    shape: "petal",
    to: "/catalogo?categoria=Combos",
    src: MEDIA.hero.detalles,
    alt: "Peluche con flores y globo",
    label: "Detalles",
    title: "Flores y algo más.",
    depth: 10,
  },
];

export default function HeroBloom() {
  const heroRef = useRef(null);

  // Movimiento suave con el mouse (solo escritorio y si el usuario no pidió menos animación).
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return undefined;

    let frame = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    function onMove(e) {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function onLeave() {
      tx = 0;
      ty = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    }
    function tick() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    }

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="bloom" ref={heroRef} aria-labelledby="home-hero-title">
      <div className="bloom__wrap">
        <div className="bloom__grid">
          <BrandMark className="bloom__watermark" />
          <div className="bloom__intro">
            <p className="bloom__kicker">Florería en Arequipa</p>
            <h1 id="home-hero-title" className="bloom__title">
              <span className="bloom__line"><span>Los favoritos,</span></span>
              <span className="bloom__line"><span>sin complicaciones.</span></span>
            </h1>
            <p className="bloom__lead">
              Flores bonitas, detalles que se sienten y una compra sencilla. Elige tu favorito y
              nosotros nos encargamos del resto.
            </p>
            <div className="bloom__actions">
              <Link to="/catalogo" className="btn btn-primary bloom__cta">
                Ver favoritos <ArrowRightIcon size={17} />
              </Link>
              <Link to="/catalogo?ocasion=Amor" className="bloom__link">
                Buscar por ocasión
              </Link>
            </div>
            <ol className="bloom__steps" aria-label="Cómo comprar">
              <li><b>1</b> Selecciona</li>
              <li><b>2</b> Personaliza</li>
              <li><b>3</b> Recibe</li>
            </ol>
          </div>

          {PIECES.map((p, i) => (
            <Link
              key={p.key}
              to={p.to}
              className={`bloom__piece bloom__piece--${p.key} bloom__shape--${p.shape}`}
              style={{ "--depth": p.depth, "--i": i }}
            >
              <span className="bloom__frame">
                <BloomImage src={p.src} alt={p.alt} priority={p.priority} />
              </span>
              <span className="bloom__caption">
                <span className="bloom__label">{p.label}</span>
                <strong>{p.title}</strong>
                <span className="bloom__go" aria-hidden="true"><ArrowRightIcon size={15} /></span>
              </span>
            </Link>
          ))}

          {/* Sello giratorio con la foto del ramo rosado */}
          <Link to="/catalogo" className="bloom__seal" aria-label="Ver catálogo">
            <svg viewBox="0 0 200 200" className="bloom__seal-ring" aria-hidden="true">
              <defs>
                <path id="bloom-seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#bloom-seal-path">
                  Florería Shalom ✿ hechas a mano en Arequipa ✿
                </textPath>
              </text>
            </svg>
            <span className="bloom__seal-photo bloom__seal-photo--logo">
              <BrandMark />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}