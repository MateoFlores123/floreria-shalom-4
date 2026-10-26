-- ==========================================================
--  Tablas de la base de datos D1
--  Se crean una sola vez con:
--  npx wrangler d1 execute floreria-shalom-db --remote --file=schema.sql
-- ==========================================================

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  phone TEXT NOT NULL,
  phone_key TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

-- Cada pedido se guarda completo en "data" (JSON), igual que antes en db.json
CREATE TABLE IF NOT EXISTS orders (
  code TEXT PRIMARY KEY,
  user_id TEXT,
  phone_key TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders (phone_key);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders (created_at);

-- Fotos de entrega y de referencia (ya llegan comprimidas desde el panel)
CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  mime TEXT NOT NULL,
  data BLOB NOT NULL,
  created_at TEXT NOT NULL
);
