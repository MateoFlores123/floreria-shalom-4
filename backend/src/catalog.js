// Catálogo de productos.
//
// Los productos viven en backend/catalog/products.json (dentro del código),
// NO en la base de datos. Así, cuando editas un precio o agregas un producto
// y subes los cambios (git push), Railway publica el catálogo actualizado.
//
// Cómo editar un producto en products.json:
//   "price": null   -> el producto se muestra con "Precio por confirmar"
//                      y no se puede agregar al carrito.
//   "price": 89     -> precio en soles (sin comillas).
//   "oldPrice": 110 -> precio anterior tachado (opcional, o null).
//   "active": false -> oculta el producto sin borrarlo.

const fs = require("fs");
const path = require("path");

const CATALOG_PATH = path.join(__dirname, "..", "catalog", "products.json");

// Se lee en cada petición para que los cambios se vean sin reiniciar en local.
function getProducts() {
  const raw = fs.readFileSync(CATALOG_PATH, "utf-8");
  return JSON.parse(raw);
}

function hasPrice(product) {
  return typeof product.price === "number" && product.price > 0;
}

module.exports = { getProducts, hasPrice, CATALOG_PATH };   