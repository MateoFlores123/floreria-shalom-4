// ==========================================================
//  API de Florería Shalom — Cloudflare Workers + D1
//  Mismas rutas que el backend anterior (Express), así el
//  frontend solo cambia la dirección en VITE_API_URL.
// ==========================================================
import { Hono } from "hono";
import { cors } from "hono/cors";
import products from "./routes/products.js";
import auth from "./routes/auth.js";
import orders from "./routes/orders.js";
import { getDeliveryConfig } from "./lib/delivery.js";
import { getPhoto } from "./lib/db.js";

const app = new Hono();

app.use("/api/*", cors());

// El catálogo y las zonas solo cambian cuando publicas (npm run deploy):
// el navegador puede guardarlos 2 minutos y así la página carga al instante.
app.use("/api/products/*", async (c, next) => {
  await next();
  if (c.req.method === "GET" && c.res.status === 200) c.header("Cache-Control", "public, max-age=120");
});
app.use("/api/products", async (c, next) => {
  await next();
  if (c.req.method === "GET" && c.res.status === 200) c.header("Cache-Control", "public, max-age=120");
});

app.get("/", (c) => c.text("API de Florería Shalom 🌸 — prueba /api/health"));

app.get("/api/health", (c) => c.json({ ok: true, name: "Floreria Shalom API (Cloudflare)" }));

// Zonas y costos de delivery (los usa el checkout)
app.get("/api/delivery", (c) => {
  const { origin, zones } = getDeliveryConfig();
  c.header("Cache-Control", "public, max-age=120");
  return c.json({ origin, zones });
});

app.route("/api/products", products);
app.route("/api/auth", auth);
app.route("/api/orders", orders);

// Fotos de entrega y de referencia: /uploads/<id>.jpg
app.get("/uploads/:id", async (c) => {
  const photo = await getPhoto(c.env.DB, c.req.param("id"));
  if (!photo) return c.text("Foto no encontrada", 404);
  return new Response(new Uint8Array(photo.data), {
    headers: {
      "content-type": photo.mime,
      "cache-control": "public, max-age=604800, immutable",
      "access-control-allow-origin": "*",
    },
  });
});

app.notFound((c) => c.json({ error: "Ruta no encontrada" }, 404));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Error interno del servidor" }, 500);
});

export default app;