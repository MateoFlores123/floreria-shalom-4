require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productsRoutes = require("./src/routes/products.routes");
const authRoutes = require("./src/routes/auth.routes");
const ordersRoutes = require("./src/routes/orders.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "Floreria Shalom 4 API" });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

// Manejo de errores genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🌸 Floreria Shalom 4 API escuchando en http://localhost:${PORT}`);
});
