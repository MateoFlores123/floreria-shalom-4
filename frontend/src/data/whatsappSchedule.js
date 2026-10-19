// ==========================================================
//  HORARIO DE ATENCIÓN POR WHATSAPP (botones de la web)
//  La página cambia sola de número según la hora de Perú,
//  aunque el cliente tenga otra hora en su celular.
//
//  Gemelo en el backend (pedidos del carrito):
//    backend/src/config/whatsappSchedule.js
//  Si cambias algo aquí, cámbialo igual allá.
// ==========================================================

const TIMEZONE = "America/Lima";

// Cada tramo: desde (incluido) — hasta (sin incluir), en formato 24 h.
export const WHATSAPP_SCHEDULE = [
  // Mañana: hasta la 1 p. m. (y la hora de 1 a 2 p. m. también va aquí)
  { from: "00:00", to: "14:00", number: "51922522531", display: "+51 922 522 531" },
  // Tarde: de 2 p. m. a 7 p. m.
  { from: "14:00", to: "19:00", number: "51924752969", display: "+51 924 752 969" },
];

// Para cualquier hora fuera de la lista (después de las 7 p. m.)
export const DEFAULT_WHATSAPP = { number: "51922522531", display: "+51 922 522 531" };

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function limaMinutes(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === "hour").value);
  const m = Number(parts.find((p) => p.type === "minute").value);
  return h * 60 + m;
}

export function getCurrentWhatsApp(date = new Date()) {
  const now = limaMinutes(date);
  const slot = WHATSAPP_SCHEDULE.find((s) => now >= toMinutes(s.from) && now < toMinutes(s.to));
  return slot || DEFAULT_WHATSAPP;
}

export function whatsappLink(number, text) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}