import { useEffect, useRef } from "react";
import { TERMS_SECTIONS, TERMS_UPDATED } from "../data/terms";
import { CloseIcon } from "./icons";
import "../styles/terms.css";

// Texto completo de los términos (se usa en la página y en la ventana)
export function TermsContent() {
  return (
    <div className="terms">
      <p className="terms__updated">Última actualización: {TERMS_UPDATED}</p>
      {TERMS_SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className={`terms__section ${s.highlight ? "terms__section--highlight" : ""}`}>
          <h2>{s.title}</h2>
          {(s.body || []).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {s.items && (
            <ul>
              {s.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          )}
          {(s.after || []).map((p, i) => (
            <p key={`a${i}`}>{p}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

// Ventana con los términos, con botón para aceptarlos
export function TermsModal({ open, onClose, onAccept }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="terms-modal"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="terms-modal-title"
    >
      <div className="terms-modal__panel">
        <header className="terms-modal__head">
          <h2 id="terms-modal-title">Términos y condiciones</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </header>
        <div className="terms-modal__body">
          <TermsContent />
        </div>
        <footer className="terms-modal__foot">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cerrar
          </button>
          <button type="button" className="btn btn-primary" onClick={onAccept}>
            Acepto los términos
          </button>
        </footer>
      </div>
    </dialog>
  );
}