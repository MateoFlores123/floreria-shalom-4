// Catálogo de productos: se edita en catalog/products.json y se publica con "npm run deploy".
//
//   "price": null   -> "Precio por confirmar" (igual se puede pedir)
//   "price": 89     -> precio en soles
//   "oldPrice": 110 -> precio anterior tachado (opcional)
//   "active": false -> oculta el producto sin borrarlo
//   "categories": ["Box", "Rosas"] -> aparece en ambas categorías (la primera es la principal)
import rawProducts from "../../catalog/products.json";

// Acepta 89, "89", "89.90" o "S/ 89". Cualquier otra cosa = precio por confirmar.
function parsePrice(value) {
  if (typeof value === "number") return value > 0 ? value : null;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.,]/g, "").replace(",", "."));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}

const PRODUCTS = rawProducts.map((p) => {
  const categories =
    Array.isArray(p.categories) && p.categories.length ? p.categories : [p.category].filter(Boolean);
  return {
    ...p,
    price: parsePrice(p.price),
    oldPrice: parsePrice(p.oldPrice),
    categories,
    category: categories[0],
  };
});

export function getProducts() {
  return PRODUCTS;
}

export function hasPrice(product) {
  return typeof product.price === "number" && product.price > 0;
}

export function inCategory(product, category) {
  return product.categories.includes(category);
}
