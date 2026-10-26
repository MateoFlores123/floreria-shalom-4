import { Hono } from "hono";
import { hashPassword, checkPassword, createToken, requireAuth } from "../lib/auth.js";
import { findUserByEmail, findUserById, publicUser, phoneKey } from "../lib/db.js";

const auth = new Hono();

// POST /api/auth/register
auth.post("/register", async (c) => {
  const { name, email, phone, password } = await c.req.json().catch(() => ({}));
  if (!name || !email || !phone || !password) {
    return c.json({ error: "Todos los campos son obligatorios" }, 400);
  }
  if (String(password).length < 6) {
    return c.json({ error: "La contraseña debe tener al menos 6 caracteres" }, 400);
  }
  if (await findUserByEmail(c.env.DB, email)) {
    return c.json({ error: "Ya existe una cuenta con ese correo" }, 409);
  }
  const user = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    created_at: new Date().toISOString(),
  };
  await c.env.DB.prepare(
    "INSERT INTO users (id, name, email, phone, phone_key, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(user.id, user.name, user.email, user.phone, phoneKey(user.phone), await hashPassword(password), user.created_at)
    .run();
  const token = await createToken(user, c.env.JWT_SECRET);
  return c.json({ token, user: publicUser(user) }, 201);
});

// POST /api/auth/login
auth.post("/login", async (c) => {
  const { email, password } = await c.req.json().catch(() => ({}));
  const user = email ? await findUserByEmail(c.env.DB, email) : null;
  if (!user || !(await checkPassword(password || "", user.password_hash))) {
    return c.json({ error: "Correo o contraseña incorrectos" }, 401);
  }
  const token = await createToken(user, c.env.JWT_SECRET);
  return c.json({ token, user: publicUser(user) });
});

// GET /api/auth/me
auth.get("/me", requireAuth, async (c) => {
  const user = await findUserById(c.env.DB, c.get("user").id);
  if (!user) return c.json({ error: "Usuario no encontrado" }, 404);
  return c.json(publicUser(user));
});

export default auth;
