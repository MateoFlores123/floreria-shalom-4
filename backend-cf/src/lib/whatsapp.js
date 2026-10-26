// Mensaje de WhatsApp con el resumen del pedido (lo envía el cliente a la florería)

export function formatCurrency(n) {
  return `S/ ${Number(n).toFixed(2)}`;
}

export function buildOrderMessage(order) {
  const lines = [];
  lines.push(`Hola Florería Shalom! 🌸 Quiero confirmar mi pedido *${order.code}*.`);
  lines.push("");
  lines.push("*Productos:*");
  order.items.forEach((item) => {
    if (item.price === null || item.price === undefined) {
      lines.push(`• ${item.qty} x ${item.name} — precio por confirmar`);
    } else {
      lines.push(
        `• ${item.qty} x ${item.name} — ${formatCurrency(item.price)} c/u = ${formatCurrency(item.price * item.qty)}`
      );
    }
  });
  lines.push("");
  lines.push(`Subtotal: ${formatCurrency(order.subtotal)}`);
  const zone = order.deliveryZone ? ` (${order.deliveryZone})` : "";
  lines.push(
    order.deliveryFee === null || order.deliveryFee === undefined
      ? `Delivery${zone}: por confirmar`
      : `Delivery${zone}: ${formatCurrency(order.deliveryFee)}`
  );
  if (order.pendingPrices) {
    lines.push(`*Total parcial: ${formatCurrency(order.total)}*`);
    lines.push("(Hay productos con precio por confirmar: por favor indíquenme el total final.)");
  } else {
    lines.push(`*Total a pagar: ${formatCurrency(order.total)}*`);
  }
  lines.push("");
  lines.push("*Datos de entrega:*");
  lines.push(`Nombre: ${order.customer.name}`);
  lines.push(`Teléfono: ${order.customer.phone}`);
  lines.push(`Distrito: ${order.customer.district}`);
  lines.push(`Dirección: ${order.customer.address}`);
  if (order.customer.reference) lines.push(`Referencia: ${order.customer.reference}`);
  lines.push(`Fecha de entrega: ${order.deliveryDate} — ${order.deliveryTime}`);
  if (order.dedication) lines.push(`Mensaje de tarjeta: "${order.dedication}"`);
  lines.push("");
  lines.push(`*Método de pago elegido:* ${order.paymentMethod}`);
  if (order.termsAccepted) {
    lines.push("");
    lines.push(
      "✅ Acepto los términos y condiciones: entiendo que las fotos son referenciales y que el arreglo se prepara con las flores disponibles, lo más parecido posible y con flores del mismo valor."
    );
  }
  lines.push("Quedo atento(a) para confirmar el pedido y realizar el pago por Yape o transferencia. ¡Gracias!");
  return lines.join("\n");
}

// Deja el número listo para wa.me: solo dígitos y con el código de Perú (51)
export function normalizePhone(phoneNumber) {
  const digits = String(phoneNumber || "").replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("9")) return `51${digits}`;
  return digits;
}

export function buildWhatsAppUrl(phoneNumber, order) {
  return `https://wa.me/${normalizePhone(phoneNumber)}?text=${encodeURIComponent(buildOrderMessage(order))}`;
}
