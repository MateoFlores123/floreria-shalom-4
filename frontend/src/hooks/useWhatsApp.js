import { useEffect, useState } from "react";
import { getCurrentWhatsApp, whatsappLink } from "../data/whatsappSchedule";

// Devuelve el número de WhatsApp que corresponde a la hora actual en Lima.
// Se revisa cada 30 segundos, así que si alguien tiene la página abierta
// a las 1:59 p. m., el botón cambia solo a las 2:00 p. m.
export function useWhatsApp() {
  const [current, setCurrent] = useState(() => getCurrentWhatsApp());

  useEffect(() => {
    const id = setInterval(() => {
      const next = getCurrentWhatsApp();
      setCurrent((prev) => (prev.number === next.number ? prev : next));
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return {
    number: current.number,
    display: current.display,
    link: (text) => whatsappLink(current.number, text),
  };
}