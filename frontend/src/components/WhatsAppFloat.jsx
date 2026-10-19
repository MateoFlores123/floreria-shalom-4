import { useWhatsApp } from "../hooks/useWhatsApp";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const wa = useWhatsApp();
  return (
    <a
      className="wa-float"
      href={wa.link("Hola Florería Shalom! 🌸 Quisiera hacer una consulta antes de pedir.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}