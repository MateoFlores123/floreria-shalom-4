export const PAYMENT_STATUSES = ["Pendiente", "Pago aceptado", "Pago rechazado"];

export function paymentBadgeClass(paymentStatus) {
  if (paymentStatus === "Pago aceptado") return "badge--success";
  if (paymentStatus === "Pago rechazado") return "badge--danger";
  return "badge--pending";
}
