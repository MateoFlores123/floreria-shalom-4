// El catálogo ya NO se guarda en la base de datos: ahora vive en
// backend/catalog/products.json (ver src/catalog.js).
//
// Este script solo limpia la lista antigua de productos de db.json,
// sin tocar pedidos (orders) ni usuarios (users).
//
//   npm run seed

const { readDB, writeDB } = require("./db");

const db = readDB();
delete db.products;
db.orders = db.orders || [];
db.users = db.users || [];
writeDB(db);

console.log("✅ Listo: el catálogo ahora se lee de backend/catalog/products.json");