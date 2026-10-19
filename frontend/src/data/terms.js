// ==========================================================
//  TÉRMINOS Y CONDICIONES — Florería Shalom
//  Edita aquí el texto. Si cambias algo importante, sube la
//  versión (TERMS_VERSION) para que quede registrada en los
//  pedidos nuevos.
// ==========================================================

export const TERMS_VERSION = "1.0";
export const TERMS_UPDATED = "19 de octubre de 2026";

// Resumen corto que se muestra junto al botón de enviar el pedido
export const TERMS_HIGHLIGHTS = [
  "Las fotos de la tienda son referenciales.",
  "Tu arreglo se prepara con las flores disponibles en nuestro almacén ese día.",
  "Siempre buscamos que quede lo más parecido posible a la foto, usando flores del mismo valor o superior.",
  "Tu pedido queda confirmado cuando validamos el pago por WhatsApp.",
];

// Cada sección: título y párrafos (o listas con "items")
export const TERMS_SECTIONS = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    body: [
      "Al realizar un pedido en Florería Shalom, ya sea a través de esta página web o por WhatsApp, declaras haber leído, comprendido y aceptado estos términos y condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos no realizar el pedido o escribirnos antes para resolver tus dudas.",
      "Estos términos aplican a todos los productos de nuestro catálogo: ramos, box, cajas, arreglos, combos, coronas, lágrimas fúnebres, listones y flores secas.",
    ],
  },
  {
    id: "fotos",
    title: "2. Fotografías referenciales y disponibilidad de flores",
    highlight: true,
    body: [
      "Todas las fotografías que se muestran en la página web, redes sociales y catálogos son referenciales. Sirven para mostrarte el estilo, el tamaño aproximado y la composición del arreglo, pero no representan una copia exacta del producto que recibirás.",
      "Trabajamos con flores naturales y frescas, cuya disponibilidad cambia según la temporada, el clima, la cosecha de los proveedores y la demanda del día. Por eso, cada arreglo se prepara con las flores que tengamos en nuestro almacén al momento de elaborar tu pedido.",
      "Nuestro compromiso contigo:",
    ],
    items: [
      "Siempre intentaremos que tu arreglo quede lo más parecido posible a la fotografía que elegiste, respetando su estilo, sus colores principales, su tamaño y su presentación.",
      "Si alguna flor, color o variedad no está disponible, la reemplazaremos por otra de igual o mayor valor y de apariencia similar, para que tu regalo mantenga la misma calidad y presencia.",
      "Nunca reemplazaremos una flor por otra de menor valor para abaratar el arreglo.",
      "Si el cambio es importante (por ejemplo, el color principal del ramo), haremos lo posible por consultarte antes por WhatsApp.",
    ],
    after: [
      "También pueden variar ligeramente los elementos decorativos y de presentación, como el papel, las cintas, los listones, las cajas, las canastas, los globos, los peluches, los chocolates o las bebidas, según el stock disponible. En esos casos usaremos siempre una alternativa equivalente.",
      "Al ser un producto natural, cada flor es única: es normal que existan pequeñas diferencias de tono, tamaño, forma o nivel de apertura entre una flor y otra, y respecto a la foto. Estas variaciones no se consideran un defecto del producto.",
    ],
  },
  {
    id: "pedidos",
    title: "3. Pedidos y confirmación",
    body: [
      "Al completar el formulario y enviar tu pedido por WhatsApp, recibimos una solicitud con el detalle de los productos, la dirección, la fecha y el horario de entrega.",
      "El pedido queda confirmado únicamente cuando validamos tu pago. Hasta ese momento la reserva de flores, fecha y horario no está garantizada, sobre todo en fechas de alta demanda.",
      "Es tu responsabilidad revisar que los datos ingresados (nombre, celular, distrito, dirección, referencia, fecha y dedicatoria) sean correctos antes de enviar el pedido.",
    ],
  },
  {
    id: "precios",
    title: "4. Precios y pagos",
    body: [
      "Los precios están expresados en soles (S/) e incluyen el arreglo tal como se describe en el catálogo. El costo de delivery se muestra por separado al finalizar el pedido.",
      "Algunos productos pueden figurar con «precio por confirmar». En esos casos te indicaremos el precio final por WhatsApp antes de que realices el pago; tú decides si continúas o no con el pedido.",
      "Aceptamos pagos por Yape y transferencia bancaria. Los datos para pagar te los compartimos por WhatsApp. Solo debes pagar a los números o cuentas que te indiquemos desde nuestros números oficiales.",
      "Los precios pueden cambiar sin previo aviso, sobre todo en temporadas especiales. El precio que se respeta es el confirmado por WhatsApp al momento de tu pedido.",
    ],
  },
  {
    id: "entregas",
    title: "5. Entregas",
    items: [
      "Realizamos entregas en los distritos de Arequipa indicados en el formulario. Para otras zonas, consúltanos por WhatsApp.",
      "El horario que eliges es un rango estimado. Haremos todo lo posible por entregar dentro de ese rango, pero pueden ocurrir retrasos por tráfico, clima, cierres de vías u otras causas ajenas a nosotros.",
      "En fechas de alta demanda (San Valentín, Día de la Madre, fiestas de fin de año y similares) los tiempos de entrega pueden ser mayores. Te recomendamos pedir con anticipación.",
      "Si la persona que recibe no se encuentra, intentaremos comunicarnos contigo y con el destinatario. Si no es posible entregar, coordinaremos contigo una nueva entrega, que podría tener un costo adicional de delivery.",
      "Si la dirección o la referencia son incorrectas o incompletas, el tiempo de entrega puede extenderse y podría aplicarse un costo adicional.",
      "Una vez entregado el arreglo, su cuidado queda a cargo de quien lo recibe.",
    ],
  },
  {
    id: "dedicatorias",
    title: "6. Dedicatorias",
    body: [
      "La dedicatoria que escribas se incluirá en una tarjeta junto al arreglo, tal como la enviaste. Revisa bien la ortografía y los nombres antes de enviar el pedido.",
      "Nos reservamos el derecho de no incluir mensajes con contenido ofensivo, discriminatorio o que pueda causar daño a terceros.",
    ],
  },
  {
    id: "cambios",
    title: "7. Cambios y cancelaciones",
    items: [
      "Puedes solicitar cambios (dirección, fecha, horario o dedicatoria) o la cancelación de tu pedido escribiéndonos por WhatsApp antes de que empecemos a prepararlo.",
      "Una vez que el arreglo está en preparación, ya no es posible cancelarlo ni devolver el dinero, porque las flores son un producto perecible que no puede volver a venderse.",
      "Si por algún motivo no podemos atender tu pedido, te lo comunicaremos y te devolveremos el monto pagado o te ofreceremos una alternativa, según prefieras.",
    ],
  },
  {
    id: "reclamos",
    title: "8. Reclamos",
    body: [
      "Si tienes algún inconveniente con tu pedido, escríbenos por WhatsApp dentro de las 24 horas siguientes a la entrega, con fotos del arreglo y tu código de pedido. Revisaremos cada caso con atención y buscaremos una solución justa.",
      "No se consideran reclamos válidos las diferencias propias de un producto natural ni los cambios de flores o decoración descritos en la sección 2, siempre que se hayan respetado el estilo y el valor del arreglo.",
    ],
  },
  {
    id: "cuidado",
    title: "9. Cuidado de las flores",
    body: [
      "Para que tus flores duren más, mantenlas en un lugar fresco, lejos del sol directo y de fuentes de calor; cambia el agua cada día o dos y corta un poco los tallos en diagonal. La duración depende del tipo de flor y de los cuidados que reciba después de la entrega.",
    ],
  },
  {
    id: "datos",
    title: "10. Datos personales",
    body: [
      "Los datos que nos compartes (nombre, celular, dirección y datos del pedido) se usan únicamente para gestionar, entregar y dar seguimiento a tu pedido, y para comunicarnos contigo por WhatsApp. No vendemos ni compartimos tu información con terceros, salvo lo necesario para realizar la entrega.",
      "Puedes pedirnos en cualquier momento que actualicemos o eliminemos tus datos, de acuerdo con la Ley N.° 29733, Ley de Protección de Datos Personales del Perú.",
    ],
  },
  {
    id: "cambios-terminos",
    title: "11. Cambios en estos términos",
    body: [
      "Podemos actualizar estos términos cuando sea necesario. La versión vigente es siempre la publicada en esta página, y cada pedido queda registrado con la versión que aceptaste al momento de realizarlo.",
    ],
  },
];