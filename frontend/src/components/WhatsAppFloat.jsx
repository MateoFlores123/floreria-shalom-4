import { SITE } from "../data/site";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Hola Floreria Shalom 4! 🌸 Quisiera hacer una consulta antes de pedir."
  );
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${SITE.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
