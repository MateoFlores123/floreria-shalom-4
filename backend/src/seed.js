// Script de siembra (seed) de la base de datos.
//
// Llena /data/db.json (o backend/data/db.json en local) con los
// productos iniciales de la tienda. Se ejecuta UNA sola vez con:
//
//   npm run seed
//
// Es seguro volver a correrlo: reemplaza la lista de productos,
// pero no borra los pedidos (orders) ni los usuarios (users) que
// ya existan en la base de datos.

const { readDB, writeDB } = require("./db");

const products = [
  {
    id: "p001",
    name: "Ramo de 12 Rosas Rojas",
    category: "Rosas",
    price: 89.0,
    oldPrice: null,
    color: "#B23A52",
    description:
      "Doce rosas rojas nacionales envueltas en papel kraft y rafia, ideal para aniversarios y declaraciones de amor.",
    occasion: ["Amor", "Aniversario"],
    active: true,
    image: "/images/products/p001.webp",
    imageAlt: "Ramo Sillar de 12 Rosas Rojas",
  },
  {
    id: "p002",
    name: "Caja de 24 Rosas",
    category: "Rosas",
    price: 149.0,
    oldPrice: 175.0,
    color: "#8C1F35",
    description:
      "Caja redonda de terciopelo negro con 24 rosas rojas a tallo corto, un clásico para sorprender en grande.",
    occasion: ["Amor", "Cumpleaños", "Aniversario"],
    active: true,
    image: "/images/products/p002.webp",
    imageAlt: "Caja Volcán de 24 Rosas",
  },
  {
    id: "p003",
    name: "Ramo Campiña de Girasoles",
    category: "Girasoles",
    price: 79.0,
    oldPrice: null,
    color: "#D9A441",
    description:
      "Girasoles frescos con follaje silvestre, inspirados en la campiña arequipeña. Alegría pura en un ramo.",
    occasion: ["Cumpleaños", "Amistad"],
    active: true,
    image: "/images/products/p003.webp",
    imageAlt: "Ramo Campiña de Girasoles",
  },
  {
    id: "p004",
    name: "Ramo Misti de Flores Mixtas",
    category: "Variadas",
    price: 95.0,
    oldPrice: null,
    color: "#C4406B",
    description:
      "Combinación de rosas, astromelias y flores de estación en tonos rosados y blancos.",
    occasion: ["Cumpleaños", "Agradecimiento"],
    active: true,
    image: "/images/products/p004.webp",
    imageAlt: "Ramo Misti de Flores Mixtas",
  },
  {
    id: "p005",
    name: "Sombrerera Blanca de Sillar",
    category: "Cajas",
    price: 119.0,
    oldPrice: null,
    color: "#EDE6D6",
    description:
      "Sombrerera en tonos blancos inspirada en la arquitectura de sillar, con rosas y flores de estación.",
    occasion: ["Cumpleaños", "Nacimiento"],
    active: true,
    image: "/images/products/p005.webp",
    imageAlt: "Sombrerera Blanca de Sillar",
  },
  {
    id: "p006",
    name: "Caja Chachani con Girasoles y Vino",
    category: "Combos",
    price: 159.0,
    oldPrice: null,
    color: "#5B6B3F",
    description:
      "Girasoles y flores de estación acompañados de una botella de vino tinto peruano. Incluye tarjeta de dedicatoria.",
    occasion: ["Aniversario", "Agradecimiento"],
    active: true,
    image: "/images/products/p006.webp",
    imageAlt: "Caja Chachani con Girasoles y Vino",
  },
  {
    id: "p007",
    name: "Ramo Yanahuara de Tulipanes",
    category: "Variadas",
    price: 109.0,
    oldPrice: null,
    color: "#B33E6E",
    description:
      "Tulipanes importados en tonos rosa y fucsia, elegantes y delicados.",
    occasion: ["Amor", "Cumpleaños"],
    active: true,
    image: "/images/products/p007.webp",
    imageAlt: "Ramo Yanahuara de Tulipanes",
  },
  {
    id: "p008",
    name: "Arreglo Condolencias Paz",
    category: "Condolencias",
    price: 139.0,
    oldPrice: null,
    color: "#4B5D45",
    description:
      "Arreglo floral en base de espuma con flores blancas y follaje verde, un mensaje de acompañamiento y paz.",
    occasion: ["Condolencias"],
    active: true,
    image: "/images/products/p008.webp",
    imageAlt: "Arreglo Condolencias Paz",
  },
  {
    id: "p009",
    name: "Osito y Rosas Sillar",
    category: "Combos",
    price: 99.0,
    oldPrice: null,
    color: "#C4406B",
    description:
      "Seis rosas rojas acompañadas de un osito de peluche mediano, ideal para cumpleaños y San Valentín.",
    occasion: ["Amor", "Cumpleaños"],
    active: true,
    image: "/images/products/p009.webp",
    imageAlt: "Osito y Rosas Sillar",
  },
  {
    id: "p010",
    name: "Ramo Colca de Rosas Rosadas",
    category: "Rosas",
    price: 85.0,
    oldPrice: null,
    color: "#D97AA0",
    description:
      "Doce rosas rosadas con eucalipto, un gesto tierno para alguien especial.",
    occasion: ["Amistad", "Agradecimiento"],
    active: true,
    image: "/images/products/p010.webp",
    imageAlt: "Ramo Colca de Rosas Rosadas",
  },
  {
    id: "p011",
    name: "Caja Premium 50 Rosas",
    category: "Rosas",
    price: 289.0,
    oldPrice: 320.0,
    color: "#7A1B2E",
    description:
      "Nuestra caja más grande: 50 rosas rojas seleccionadas, para ocasiones inolvidables.",
    occasion: ["Aniversario", "Amor"],
    active: true,
    image: "/images/products/p011.webp",
    imageAlt: "Caja Premium 50 Rosas",
  },
  {
    id: "p012",
    name: "Ramo Chapi de Flores de Campo",
    category: "Variadas",
    price: 69.0,
    oldPrice: null,
    color: "#8E9B4A",
    description:
      "Flores silvestres de estación en un ramo fresco y campestre, perfecto para cualquier día.",
    occasion: ["Amistad", "Agradecimiento"],
    active: true,
    image: "/images/products/p012.webp",
    imageAlt: "Ramo Chapi de Flores de Campo",
  },
  {
    id: "p013",
    name: "Box Sorpresa Chocolate y Rosas",
    category: "Box",
    price: 129.0,
    oldPrice: null,
    color: "#8C1F35",
    description:
      "Box redondo con rosas rojas, chocolates surtidos y una vela aromática, ideal para regalar en cualquier ocasión.",
    occasion: ["Amor", "Cumpleaños"],
    active: true,
    image: "/images/products/p013.webp",
    imageAlt: "Box Sorpresa Chocolate y Rosas",
  },
  {
    id: "p014",
    name: "Box Desayuno Sorpresa Floral",
    category: "Box",
    price: 145.0,
    oldPrice: null,
    color: "#D9A441",
    description:
      "Box con mini desayuno dulce, flores de estación y globo, perfecto para sorprender a primera hora.",
    occasion: ["Cumpleaños", "Amor", "Agradecimiento"],
    active: true,
    image: "/images/products/p014.webp",
    imageAlt: "Box Desayuno Sorpresa Floral",
  },
  {
    id: "p015",
    name: "Listón Satinado Personalizado",
    category: "Listones",
    price: 12.0,
    oldPrice: null,
    color: "#C4406B",
    description:
      "Listón de raso a elección de color con tu dedicatoria impresa, para acompañar cualquier ramo o caja.",
    occasion: ["Amor", "Cumpleaños", "Agradecimiento"],
    active: true,
    image: "/images/products/p015.webp",
    imageAlt: "Listón Satinado Personalizado",
  },
  {
    id: "p016",
    name: "Set de Listones Decorativos x5",
    category: "Listones",
    price: 25.0,
    oldPrice: 32.0,
    color: "#B98A3E",
    description:
      "Set de cinco listones en tonos tierra y dorado para envolver arreglos con un acabado elegante.",
    occasion: ["Cumpleaños", "Agradecimiento"],
    active: true,
    image: "/images/products/p016.webp",
    imageAlt: "Set de Listones Decorativos x5",
  },
  {
    id: "p017",
    name: "Ramo de Flores Secas Sillar",
    category: "Flores Secas",
    price: 89.0,
    oldPrice: null,
    color: "#D8B565",
    description:
      "Ramo de flores secas y preservadas en tonos beige y dorado, no requiere agua y dura meses.",
    occasion: ["Amistad", "Agradecimiento"],
    active: true,
    image: "/images/products/p017.webp",
    imageAlt: "Ramo de Flores Secas Sillar",
  },
  {
    id: "p018",
    name: "Corona de Flores Secas para Pared",
    category: "Flores Secas",
    price: 99.0,
    oldPrice: null,
    color: "#5B6B3F",
    description:
      "Corona decorativa de flores secas y follaje natural, ideal para decorar espacios de forma permanente.",
    occasion: ["Agradecimiento"],
    active: true,
    image: "/images/products/p018.webp",
    imageAlt: "Corona de Flores Secas para Pared",
  },
];

function seed() {
  // Lee lo que ya exista en la base de datos (por ejemplo, para no
  // borrar pedidos o usuarios que ya se hayan creado en producción).
  const db = readDB();

  db.products = products;
  db.orders = db.orders || [];
  db.users = db.users || [];

  writeDB(db);

  console.log(`✅ Seed completo: ${products.length} productos cargados.`);
}

seed();