// Cuentas de clientes (contraseñas cifradas) y acceso al panel admin.
import { sign, verify } from "hono/jwt";

// PBKDF2-SHA256 con sal aleatoria. Las iteraciones son moderadas para
// entrar en el límite de procesador del plan gratis de Workers (10 ms).
const ITERATIONS = 20000;
const enc = new TextEncoder();

const toB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const fromB64 = (s) => Uint8Array.from(atob(s), (ch) => ch.charCodeAt(0));

async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await derive(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toB64(salt)}$${toB64(bits)}`;
}

export async function checkPassword(password, stored) {
  const [scheme, iter, saltB64, hashB64] = String(stored || "").split("$");
  if (scheme !== "pbkdf2") return false;
  const bits = new Uint8Array(await derive(password, fromB64(saltB64), Number(iter)));
  return safeEqual(bits, fromB64(hashB64));
}

// Comparación en tiempo constante
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ---------- Tokens de sesión (30 días) ----------
export function createToken(user, secret) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
  return sign({ id: user.id, name: user.name, email: user.email, exp }, secret, "HS256");
}

async function readToken(c) {
  const header = c.req.header("authorization") || "";
  if (!header.startsWith("Bearer ")) return null;
  try {
    return await verify(header.slice(7), c.env.JWT_SECRET, "HS256");
  } catch {
    return null;
  }
}

// Adjunta el usuario si hay sesión, pero deja pasar a invitados
export async function optionalAuth(c, next) {
  c.set("user", await readToken(c));
  await next();
}

export async function requireAuth(c, next) {
  const user = await readToken(c);
  if (!user) return c.json({ error: "No autenticado" }, 401);
  c.set("user", user);
  await next();
}

// Panel admin: cabecera "x-admin-token: usuario:contraseña"
export async function requireAdmin(c, next) {
  const token = c.req.header("x-admin-token") || "";
  const expected = `${c.env.ADMIN_USER}:${c.env.ADMIN_PASSWORD}`;
  if (!c.env.ADMIN_PASSWORD || !safeEqual(enc.encode(token), enc.encode(expected))) {
    return c.json({ error: "Credenciales de administrador inválidas" }, 401);
  }
  await next();
}
