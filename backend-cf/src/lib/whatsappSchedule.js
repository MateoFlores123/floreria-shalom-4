// ==========================================================
//  HORARIO DE ATENCIÓN POR WHATSAPP (pedidos del carrito)
//  La hora se calcula siempre en Perú (America/Lima).
//  Gemelo en el frontend: frontend/src/data/whatsappSchedule.js
// ==========================================================

const TIMEZONE = "America/Lima";

// Cada tramo: desde (incluido) — hasta (sin incluir), formato 24 h.
const SCHEDULE = [
  // Mañana: hasta la 1 p. m. (y la hora de 1 a 2 p. m. también va aquí)
  { from: "00:00", to: "14:00", number: "51922522531" },
  // Tarde: de 2 p. m. a 7 p. m.
  { from: "14:00", to: "19:00", number: "51924752969" },
];

// Para cualquier hora fuera de la lista (después de las 7 p. m.)
const DEFAULT_NUMBER = "51922522531";

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

export function getWhatsAppNumber(date = new Date()) {
  // Obtener día de la semana en horario de Perú
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
  }).format(date);

  // Sábado y domingo: usar siempre este número
  if (day === "Sat" || day === "Sun") {
    return "51924752969";
  }

  // De lunes a viernes: aplicar horario habitual
  const now = limaMinutes(date);

  const slot = SCHEDULE.find(
    (s) => now >= toMinutes(s.from) && now < toMinutes(s.to)
  );

  return slot ? slot.number : DEFAULT_NUMBER;
}