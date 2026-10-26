// Acceso a la base de datos D1 (binding "DB" en wrangler.jsonc)

// Últimos 9 dígitos del celular (ignora espacios, guiones y el 51)
export function phoneKey(phone) {
  return String(phone || "").replace(/\D/g, "").slice(-9);
}

// ---------- Pedidos ----------
export async function getOrder(db, code) {
  const row = await db.prepare("SELECT data FROM orders WHERE code = ?").bind(code).first();
  return row ? JSON.parse(row.data) : null;
}

export async function saveOrder(db, order) {
  await db
    .prepare(
      `INSERT INTO orders (code, user_id, phone_key, data, created_at) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(code) DO UPDATE SET user_id = excluded.user_id, phone_key = excluded.phone_key, data = excluded.data`
    )
    .bind(order.code, order.userId || null, phoneKey(order.customer?.phone), JSON.stringify(order), order.createdAt)
    .run();
  return order;
}

export async function listOrders(db, where = "", params = []) {
  const { results } = await db
    .prepare(`SELECT data FROM orders ${where} ORDER BY created_at DESC`)
    .bind(...params)
    .all();
  return results.map((r) => JSON.parse(r.data));
}

// ---------- Usuarios ----------
export async function findUserByEmail(db, email) {
  return db.prepare("SELECT * FROM users WHERE email = ? COLLATE NOCASE").bind(email).first();
}

export async function findUserById(db, id) {
  return db.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
}

export function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email, phone: row.phone, createdAt: row.created_at };
}

// ---------- Fotos ----------
const PHOTO_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
// D1 admite filas de hasta ~2 MB; las fotos llegan comprimidas (~200-400 KB)
const MAX_PHOTO_BYTES = 1.8 * 1024 * 1024;

// Guarda una foto en base64 y devuelve { url, uploadedAt }. Lanza un error con mensaje claro.
export async function savePhoto(db, dataUrl) {
  const found = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(dataUrl || "");
  if (!found) throw new Error("La foto debe ser JPG, PNG o WEBP.");
  const bytes = Uint8Array.from(atob(found[2]), (ch) => ch.charCodeAt(0));
  if (bytes.length > MAX_PHOTO_BYTES) throw new Error("La foto es muy pesada. Intenta con otra foto.");
  // Nombre aleatorio: no se puede adivinar la foto de otro pedido
  const id = `${crypto.randomUUID()}.${PHOTO_TYPES[found[1]]}`;
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO photos (id, mime, data, created_at) VALUES (?, ?, ?, ?)").bind(id, found[1], bytes, now).run();
  return { url: `/uploads/${id}`, uploadedAt: now };
}

export async function removePhoto(db, photo) {
  if (!photo?.url) return;
  const id = photo.url.split("/").pop();
  await db.prepare("DELETE FROM photos WHERE id = ?").bind(id).run();
}

export async function getPhoto(db, id) {
  return db.prepare("SELECT mime, data FROM photos WHERE id = ?").bind(id).first();
}
