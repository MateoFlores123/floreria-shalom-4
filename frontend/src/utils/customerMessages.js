import { BUSINESS_NAME, PAYMENT_INFO } from "../data/payment";

const money = (n) => `S/ ${Number(n || 0).toFixed(2)}`;

// Celular del cliente en formato wa.me (agrega 51 si tiene 9 dígitos)
export function customerWhatsAppLink(phone, text) {
  const digits = String(phone || "").replace(/\D/g, "");
  const number = digits.length === 9 ? `51${digits}` : digits;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

function firstName(order) {
  return String(order.customer?.name || "").trim().split(" ")[0] || "";
}

// Mensaje 1: detalle del pedido + datos para pagar
export function paymentRequestMessage(order) {
  const { yape, transfer } = PAYMENT_INFO;
  const lines = [];
  lines.push(`Hola ${firstName(order)} 🌸`);
  lines.push(`Te saluda ${BUSINESS_NAME}. Tu pedido es el número *${order.code}* y consta de:`);
  order.items.forEach((it) => {
    lines.push(`• ${it.qty > 1 ? `${it.qty} x ` : ""}${it.name}`);
  });
  lines.push("");
  lines.push(`Arreglo: ${money(order.subtotal)}`);
  lines.push(
    `Delivery${order.customer?.district ? ` (${order.customer.district})` : ""}: ${money(order.deliveryFee)}`
  );
  lines.push(`*Total a pagar: ${money(order.total)}*`);
  lines.push("");
  if (order.deliveryDate) lines.push(`Entrega: ${order.deliveryDate}${order.deliveryTime ? ` · ${order.deliveryTime}` : ""}`);
  lines.push(`Dirección: ${order.customer?.address || ""}`);
  if (order.dedication) lines.push(`Dedicatoria: "${order.dedication}"`);
  lines.push("");
  lines.push("Para confirmar tu pedido, realiza el pago por:");
  lines.push(`• *Yape* al ${yape.number} (${yape.holder})`);
  lines.push(
    `• *Transferencia* ${transfer.bank} N.° ${transfer.account}${transfer.cci ? ` (CCI ${transfer.cci})` : ""} a nombre de ${transfer.holder}`
  );
  lines.push("");
  lines.push("Luego envíanos por aquí la captura del pago y confirmamos tu pedido. ¡Gracias! 💐");
  return lines.join("\n");
}

// Mensaje 2: pago confirmado + cómo seguir el pedido
export function paymentConfirmedMessage(order, siteUrl = window.location.origin) {
  const phone = order.customer?.phone || "";
  const link = `${siteUrl}/seguimiento?code=${encodeURIComponent(order.code)}&phone=${encodeURIComponent(phone)}`;
  return [
    `Hola ${firstName(order)} ✅`,
    `¡Recibimos tu pago! Tu pedido *${order.code}* está confirmado y ya lo estamos preparando.`,
    "",
    "Para ver el estado de tu pedido, entra a tu cuenta en nuestra página o a la sección *Seguir pedido* con estos datos:",
    `• Código: *${order.code}*`,
    `• Celular: *${phone}*`,
    "",
    `O entra directo aquí: ${link}`,
    "",
    `Gracias por confiar en ${BUSINESS_NAME} 🌷`,
  ].join("\n");
}