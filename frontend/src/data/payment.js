// ==========================================================
//  DATOS DE PAGO — se usan en el mensaje que se le envía al
//  cliente por WhatsApp cuando registras un pedido personalizado.
//  ⚠ Reemplaza todo lo que dice "COMPLETAR" por tus datos reales.
// ==========================================================

export const BUSINESS_NAME = "Florería Shalom & Amor";

export const PAYMENT_INFO = {
  yape: {
    number: "922 522 531", // ej. "922 522 531"
    holder: "MATEO FLORES", // nombre que aparece en Yape
  },
  transfer: {
    bank: "BCP", // ej. "BCP"
    account: "0000000000000", // número de cuenta
    cci: "", // código interbancario (opcional: deja "" si no quieres mostrarlo)
    holder: "MATEO FLORES", // titular de la cuenta
  },
};

// true si todavía hay datos sin completar (el panel muestra un aviso)
export function paymentInfoIncomplete() {
  const values = [
    PAYMENT_INFO.yape.number,
    PAYMENT_INFO.yape.holder,
    PAYMENT_INFO.transfer.bank,
    PAYMENT_INFO.transfer.account,
    PAYMENT_INFO.transfer.holder,
  ];
  return values.some((v) => !v || v === "COMPLETAR");
}