import { useEffect, useRef, useState } from "react";
import "../styles/seasonal-notice.css";

// Aviso que aparece al entrar al catálogo: los precios cambian según la temporada.
// Se muestra una vez por visita (si cierra la pestaña y vuelve otro día, aparece de nuevo).
const NOTICE_KEY = "shalom_price_notice_seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(NOTICE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function SeasonalPriceNotice() {
  const [open, setOpen] = useState(() => !alreadySeen());
  const buttonRef = useRef(null);

  const close = () => {
    try {
      sessionStorage.setItem(NOTICE_KEY, "1");
    } catch {
      /* sin almacenamiento: igual se cierra */
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return undefined;
    buttonRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="price-notice" onClick={close}>
      <div
        className="price-notice__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-notice-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="price-notice__icon" aria-hidden="true">🌸</span>
        <h2 id="price-notice-title">Precios de temporada</h2>
        <p>
          Los precios de nuestros arreglos van cambiando según la temporada: en algunas
          épocas la flor sube de precio y en otras baja, y eso se refleja en el valor final.
        </p>
        <p className="price-notice__thanks">Agradecemos su consideración.</p>
        <button ref={buttonRef} type="button" className="price-notice__btn" onClick={close}>
          Entendido, ver catálogo
        </button>
      </div>
    </div>
  );
}