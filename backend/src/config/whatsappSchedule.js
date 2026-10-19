// ==========================================================
//  HORARIO DE ATENCIÓN POR WHATSAPP
//  Aquí decides a qué número llega cada pedido según la hora.
//  La hora SIEMPRE se calcula en Perú (America/Lima), aunque el
//  servidor de Railway esté en otro país.
//
//  Este archivo tiene un gemelo en el frontend:
//    frontend/src/data/whatsappSchedule.js
//  Si cambias algo aquí, cámbialo igual allá.
// ==========================================================

const TIMEZONE = "America/Lima";

// Cada tramo: desde (incluido) — hasta (sin incluir), en formato 24 h.
const SCHEDULE = [
  // Mañana: hasta la 1 p. m. (y la hora de 1 a 2 p. m. también va aquí)
  { from: "00:00", to: "14:00", number: "51922522531" },
  // Tarde: de 2 p. m. a 7 p. m.
  { from: "14:00", to: "19:00", number: "51924752969" },
];

// Número para cualquier hora que no esté en la lista (después de las 7 p. m.)
const DEFAULT_NUMBER = "51922522531";

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Minutos transcurridos del día en Lima (0 a 1439)
function limaMinutes(date = new Date()) {
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

function getWhatsAppNumber(date = new Date()) {
  const now = limaMinutes(date);
  const slot = SCHEDULE.find((s) => now >= toMinutes(s.from) && now < toMinutes(s.to));
  return slot ? slot.number : DEFAULT_NUMBER;
}

module.exports = { getWhatsAppNumber, SCHEDULE, DEFAULT_NUMBER, TIMEZONE };