// Costos de delivery por zona: se editan en catalog/delivery.json
import config from "../../catalog/delivery.json";

export function getDeliveryConfig() {
  return config;
}

// { zone, fee } — fee null = por confirmar. Devuelve null si el distrito no está en la lista.
export function deliveryFor(district) {
  const zone = config.zones.find((z) => z.districts.includes(district));
  if (!zone) return null;
  const fee = typeof zone.fee === "number" && zone.fee >= 0 ? zone.fee : null;
  return { zone: zone.name, fee };
}
