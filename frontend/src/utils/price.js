// Utilidades de precio compartidas.
// Un producto sin precio publicado ("price": null en products.json) se puede
// pedir igual: el precio se confirma por WhatsApp junto con el pedido.

export function hasPrice(item) {
  return typeof item?.price === "number" && item.price > 0;
}

export function money(n) {
  return `S/ ${Number(n).toFixed(2)}`;
}

export function priceLabel(item) {
  return hasPrice(item) ? money(item.price) : "Precio por confirmar";
}