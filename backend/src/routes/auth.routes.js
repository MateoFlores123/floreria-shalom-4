const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { getCollection, saveCollection } = require("../db");
const { requireAuth, JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

function publicUser(user) {
  const { passwordHash, ...rest } = user;
  return rest;
}

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const users = getCollection("users");
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    passwordHash: bcrypt.hashSync(password, 10),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveCollection("users", users);

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(201).json({ token, user: publicUser(user) });
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = getCollection("users");
  const user = users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());

  if (!user || !bcrypt.compareSync(password || "", user.passwordHash)) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json({ token, user: publicUser(user) });
});

// GET /api/auth/me
router.get("/me", requireAuth, (req, res) => {
  const users = getCollection("users");
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(publicUser(user));
});

module.exports = router;
