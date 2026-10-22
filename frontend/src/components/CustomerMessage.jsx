import { useState } from "react";
import { customerWhatsAppLink } from "../utils/customerMessages";
import { WhatsAppIcon } from "./icons";

// Mensaje listo para enviar al cliente por WhatsApp. Se puede editar antes de enviar.
export default function CustomerMessage({ title, phone, text, onClose }) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="customer-msg">
      <div className="customer-msg__head">
        <strong>{title}</strong>
        {onClose && (
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cerrar
          </button>
        )}
      </div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} rows={Math.min(18, value.split("\n").length + 1)} />
      <div className="customer-msg__actions">
        <a className="btn btn-primary" href={customerWhatsAppLink(phone, value)} target="_blank" rel="noreferrer">
          <WhatsAppIcon size={17} /> Enviar al cliente ({phone})
        </a>
        <button type="button" className="btn btn-outline" onClick={copy}>
          {copied ? "¡Copiado!" : "Copiar mensaje"}
        </button>
      </div>
    </div>
  );
}