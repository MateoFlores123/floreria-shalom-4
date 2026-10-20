require("dotenv").config();
const express = require("express");
const cors = require("cors");

const productsRoutes = require("./src/routes/products.routes");
const authRoutes = require("./src/routes/auth.routes");
const ordersRoutes = require("./src/routes/orders.routes");
const { getDeliveryConfig } = require("./src/delivery");

const app = express();

app.use(cors());
// Límite amplio para poder recibir la foto de entrega (ya llega comprimida desde el panel)
app.use(express.json({ limit: "12mb" }));

// Fotos de entrega: /uploads/<nombre>.jpg
const { UPLOAD_DIR } = require("./src/db");
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "7d" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, name: "Floreria Shalom 4 API" });
});

// Zonas y costos de delivery (los usa el checkout)
app.get("/api/delivery", (req, res) => {
  const { origin, zones } = getDeliveryConfig();
  res.json({ origin, zones });
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