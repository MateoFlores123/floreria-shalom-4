// Catálogo de productos.
//
// Los productos viven en backend/catalog/products.json (dentro del código),
// NO en la base de datos. Así, cuando editas un precio o agregas un producto
// y subes los cambios (git push), Railway publica el catálogo actualizado.
//
// Cómo editar un producto en products.json:
//   "categories": ["Box", "Rosas"] -> el producto aparece en ambas categorías.
//                      La primera es la principal (la que se muestra en la tarjeta).
//   "price": null   -> el producto se muestra con "Precio por confirmar"
//                      y no se puede agregar al carrito.
//   "price": 89     -> precio en soles (sin comillas).
//   "oldPrice": 110 -> precio anterior tachado (opcional, o null).
//   "active": false -> oculta el producto sin borrarlo.

const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "catalog", "products.json");

// Se lee en cada petición para que los cambios se vean sin reiniciar en local.
// Cada producto sale con "categories" (lista) y "category" (la principal).
// Acepta también el formato antiguo con un solo "category".
function getProducts() {
  const raw = fs.readFileSync(CATALOG_PATH, "utf-8");
  return JSON.parse(raw).map((p) => {
    const categories = Array.isArray(p.categories) && p.categories.length
      ? p.categories
      : [p.category].filter(Boolean);
    return { ...p, categories, category: categories[0] };
  });
}

function inCategory(product, category) {
  return product.categories.includes(category);
}

function hasPrice(product) {
  return typeof product.price === "number" && product.price > 0;
}

module.exports = { getProducts, hasPrice, inCategory, CATALOG_PATH };