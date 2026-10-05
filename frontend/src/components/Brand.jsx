import { useEffect, useState } from "react";
import { MEDIA } from "../data/media";

// Logo FS (tulipán + monograma). Un solo archivo con fondo transparente:
// public/images/brand/logo-fs.png
export function BrandMark({ className = "", alt = "", ...rest }) {
  return (
    <img
      src={MEDIA.brand.mark}
      alt={alt}
      className={`brand-mark ${className}`}
      draggable="false"
      decoding="async"
      {...rest}
    />
  );
}

// Indicador de carga: el logo "respira" mientras llegan los datos.
export function LogoLoader({ label = "Cargando…" }) {
  return (
    <div className="logo-loader" role="status">
      <BrandMark className="logo-loader__mark" />
      <span>{label}</span>
    </div>
  );
}

// Separador discreto entre secciones: línea · logo · línea
export function SectionOrnament() {
  return (
    <div className="section-ornament" aria-hidden="true">
      <span />
      <BrandMark className="section-ornament__mark" />
      <span />
    </div>
  );
}

// Fondo vivo de toda la página: manchas de color muy suaves que se desplazan,
// textura de papel y algunos pétalos cayendo despacio.
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="ambient__blob ambient__blob--rose" />
      <span className="ambient__blob ambient__blob--sage" />
      <span className="ambient__blob ambient__blob--peach" />
      <span className="ambient__grain" />
      <div className="ambient__petals">
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} style={{ "--p": i }} />
        ))}
      </div>
    </div>
  );
}

// Presentación de entrada: el logo aparece y la página se abre en círculo.
// Solo la primera vez por sesión y nunca si el usuario prefiere menos animación.
const SPLASH_KEY = "shalom_splash_seen";

function shouldShowSplash() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem(SPLASH_KEY);
  } catch {
    return true;
  }
}

export function IntroSplash() {
  const [phase, setPhase] = useState(() => (shouldShowSplash() ? "in" : "done"));

  useEffect(() => {
    if (phase === "done") return undefined;
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* sin almacenamiento: se muestra igual */
    }
    // Mientras el splash está visible, las animaciones del hero esperan (ver brand.css)
    const root = document.documentElement;
    root.setAttribute("data-splash", "");
    const out = setTimeout(() => {
      setPhase("out");
      root.removeAttribute("data-splash");
    }, 1500);
    const done = setTimeout(() => setPhase("done"), 2350);
    return () => {
      clearTimeout(out);
      clearTimeout(done);
      root.removeAttribute("data-splash");
    };
  }, [phase === "done"]); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "done") return null;

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true" onClick={() => { document.documentElement.removeAttribute("data-splash"); setPhase("done"); }}>
      <div className="splash__inner">
        <BrandMark className="splash__mark" />
        <p className="splash__name">Florería Shalom</p>
      </div>
    </div>
  );
}