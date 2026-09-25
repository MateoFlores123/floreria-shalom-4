function formatCurrency(n) {
  return `S/ ${Number(n).toFixed(2)}`;
}

/**
 * Construye el texto del mensaje de WhatsApp con el resumen completo del pedido:
 * productos, cantidades, precios, datos del cliente, entrega y método de pago.
 */
function buildOrderMessage(order) {
  const lines = [];

  lines.push(`Hola Floreria Shalom 4! 🌸 Quiero confirmar mi pedido *${order.code}*.`);
  lines.push("");
  lines.push("*Productos:*");
  order.items.forEach((item) => {
    lines.push(
      `• ${item.qty} x ${item.name} — ${formatCurrency(item.price)} c/u = ${formatCurrency(
        item.price * item.qty
      )}`
    );
  });
  lines.push("");
  lines.push(`Subtotal: ${formatCurrency(order.subtotal)}`);
  lines.push(`Delivery: ${formatCurrency(order.deliveryFee)}`);
  lines.push(`*Total a pagar: ${formatCurrency(order.total)}*`);
  lines.push("");
  lines.push("*Datos de entrega:*");
  lines.push(`Nombre: ${order.customer.name}`);
  lines.push(`Teléfono: ${order.customer.phone}`);
  lines.push(`Distrito: ${order.customer.district}`);
  lines.push(`Dirección: ${order.customer.address}`);
  if (order.customer.reference) {
    lines.push(`Referencia: ${order.customer.reference}`);
  }
  lines.push(`Fecha de entrega: ${order.deliveryDate} — ${order.deliveryTime}`);
  if (order.dedication) {
    lines.push(`Mensaje de tarjeta: "${order.dedication}"`);
  }
  lines.push("");
  lines.push(`*Método de pago elegido:* ${order.paymentMethod}`);
  lines.push("Quedo atento(a) para confirmar el pedido y realizar el pago por Yape o transferencia. ¡Gracias!");

  return lines.join("\n");
}

function buildWhatsAppUrl(phoneNumber, order) {
  const message = buildOrderMessage(order);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

module.exports = { buildOrderMessage, buildWhatsAppUrl, formatCurrency };
