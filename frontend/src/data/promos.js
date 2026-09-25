// Textos que rotan sobre el video del hero (home). El fondo es un único
// video continuo (ver public/hero/hero-video.mp4); aquí solo defines el
// mensaje, el eyebrow y los botones de cada "momento" del carrusel.
// Agrega tantos como quieras: el carrusel se adapta solo (flechas, puntos
// y autoplay).
export const HERO_SLIDES = [
  {
    id: "slide-promo",
    eyebrow: "Promoción de temporada",
    title: "Hasta 25% de descuento en flores amarillas",
    subtitle: "Pagando con Yape o transferencia. Válido por tiempo limitado en Arequipa.",
    ctaLabel: "Comprar ahora",
    ctaLink: "/catalogo?categoria=Girasoles",
    ctaLabelSecondary: "Ver catálogo",
    ctaLinkSecondary: "/catalogo",
  },
  {
    id: "slide-novedad",
    eyebrow: "Recién llegado",
    title: "Nueva línea de cajas y box sorpresa",
    subtitle: "Flores, chocolates y detalles combinados en una sola caja, listos para regalar.",
    ctaLabel: "Ver cajas y box",
    ctaLink: "/catalogo?categoria=Cajas",
  },
  {
    id: "slide-secas",
    eyebrow: "Novedad",
    title: "Flores secas y preservadas, belleza que dura",
    subtitle: "Arreglos de larga duración, perfectos para decorar o regalar sin fecha de vencimiento.",
    ctaLabel: "Explorar flores secas",
    ctaLink: "/catalogo?categoria=Flores%20Secas",
  },
  {
    id: "slide-ocasiones",
    eyebrow: "Para toda ocasión",
    title: "Ramos, listones y accesorios a tu medida",
    subtitle: "Personaliza tu pedido: color de listón, tarjeta de dedicatoria y envoltura especial.",
    ctaLabel: "Ver catálogo completo",
    ctaLink: "/catalogo",
  },
];

// Accesos rápidos por categoría (franja debajo del hero, tipo iconos).
// "icon" hace referencia a los componentes exportados en components/icons.jsx.
export const CATEGORY_SHORTCUTS = [
  { label: "Ramos", icon: "bouquet", image: "/images/categories/ramos.webp", link: "/catalogo?categoria=Variadas" },
  { label: "Rosas", icon: "heart", image: "/images/categories/rosas.webp", link: "/catalogo?categoria=Rosas" },
  { label: "Cajas", icon: "gift", image: "/images/categories/cajas.webp", link: "/catalogo?categoria=Cajas" },
  { label: "Box", icon: "box", image: "/images/categories/box.webp", link: "/catalogo?categoria=Box" },
  { label: "Listones", icon: "ribbon", image: "/images/categories/listones.webp", link: "/catalogo?categoria=Listones" },
  { label: "Flores secas", icon: "dried", image: "/images/categories/flores-secas.webp", link: "/catalogo?categoria=Flores%20Secas" },
  { label: "Combos", icon: "sparkle", image: "/images/categories/combos.webp", link: "/catalogo?categoria=Combos" },
  { label: "Condolencias", icon: "leaf", image: "/images/categories/condolencias.webp", link: "/catalogo?categoria=Condolencias" },
];
