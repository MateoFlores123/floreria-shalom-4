const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// Adjunta req.user si viene un token válido, pero NO bloquea la petición
// si no hay token (permite compras como invitado).
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice(7);
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      req.user = null;
    }
  }
  next();
}

// Exige un token válido de usuario.
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autenticado" });
  }
  const token = header.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// Exige credenciales de administrador simples via cabecera (prototipo).
// Header esperado: "x-admin-token: usuario:password"
function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];
  const expected = `${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`;
  if (!token || token !== expected) {
    return res.status(401).json({ error: "Credenciales de administrador inválidas" });
  }
  next();
}

module.exports = { optionalAuth, requireAuth, requireAdmin, JWT_SECRET };
