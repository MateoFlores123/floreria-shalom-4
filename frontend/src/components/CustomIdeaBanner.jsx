import { useWhatsApp } from "../hooks/useWhatsApp";
import { BrandMark } from "./Brand";
import { WhatsAppIcon, ArrowRightIcon } from "./icons";

const MESSAGE =
  "Hola Florería Shalom 🌸 Tengo una idea para un arreglo y me gustaría que me la coticen. Les cuento: ";

// Recuadro del catálogo para pedir una cotización personalizada.
// El número cambia solo según el horario (src/data/whatsappSchedule.js).
export default function CustomIdeaBanner() {
  const wa = useWhatsApp();

  return (
    <section className="idea-banner" aria-labelledby="idea-banner-title">
      <BrandMark className="idea-banner__mark" />
      <div className="idea-banner__text">
        <h2 id="idea-banner-title">¿Tienes tu propia idea?</h2>
        <p>
          Mándanosla por WhatsApp: una foto de referencia, los colores que te gustan o solo
          cuéntanos para quién es. Te la cotizamos sin compromiso.
        </p>
      </div>
      <a className="idea-banner__btn" href={wa.link(MESSAGE)} target="_blank" rel="noreferrer">
        <WhatsAppIcon size={20} />
        <span>Enviar mi idea</span>
        <ArrowRightIcon size={16} />
      </a>
    </section>
  );
}