// Costos de delivery por zona.
// Se editan en backend/catalog/delivery.json (se sube con git push, igual que el catálogo).

const fs = require("fs");
const path = require("path");

const DELIVERY_PATH = path.join(__dirname, "..", "catalog", "delivery.json");

function getDeliveryConfig() {
  return JSON.parse(fs.readFileSync(DELIVERY_PATH, "utf-8"));
}

// Devuelve la zona de un distrito, o null si no está en la lista
function findZone(district) {
  const { zones } = getDeliveryConfig();
  return zones.find((z) => z.districts.includes(district)) || null;
}

// { zone, fee } — fee null = por confirmar por WhatsApp
function deliveryFor(district) {
  const zone = findZone(district);
  if (!zone) return null;
  const fee = typeof zone.fee === "number" && zone.fee >= 0 ? zone.fee : null;
  return { zone: zone.name, fee };
}

module.exports = { getDeliveryConfig, deliveryFor };