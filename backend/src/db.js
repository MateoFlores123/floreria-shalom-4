// Base de datos simple basada en un archivo JSON.
//
// Esto es un PROTOTIPO: para producción real se recomienda migrar a
// PostgreSQL / MySQL / MongoDB.
//
// La variable DATA_DIR permite utilizar un directorio persistente
// cuando el backend se despliega en Railway.

const fs = require("fs");
const path = require("path");

// En local:
//   backend/data
//
// En producción (Railway):
//   DATA_DIR=/data
const DATA_DIR =
  process.env.DATA_DIR || path.join(__dirname, "..", "data");

const DB_PATH = path.join(DATA_DIR, "db.json");

// Crear el directorio de datos si no existe.
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Crear la base de datos inicial si no existe.
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(
      {
        products: [],
        users: [],
        orders: []
      },
      null,
      2
    ),
    "utf-8"
  );
}

// Leer toda la base de datos.
function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

// Guardar toda la base de datos.
function writeDB(data) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// Obtener una colección:
// products, users, orders, etc.
function getCollection(name) {
  const db = readDB();
  return db[name] || [];
}

// Guardar una colección.
function saveCollection(name, items) {
  const db = readDB();
  db[name] = items;
  writeDB(db);
}

// Carpeta de fotos de entrega (dentro del mismo volumen persistente)
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

module.exports = {
  DATA_DIR,
  UPLOAD_DIR,
  readDB,
  writeDB,
  getCollection,
  saveCollection
};