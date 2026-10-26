import { Hono } from "hono";
import { getProducts, inCategory } from "../lib/catalog.js";

const products = new Hono();

// GET /api/products?category=Rosas&search=rosas
products.get("/", (c) => {
  const category = c.req.query("category");
  const search = c.req.query("search");
  let list = getProducts().filter((p) => p.active !== false);
  if (category && category !== "Todas") list = list.filter((p) => inCategory(p, category));
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q));
  }
  return c.json(list);
});

// GET /api/products/categories
products.get("/categories", (c) => {
  const list = getProducts().filter((p) => p.active !== false);
  return c.json([...new Set([...list.map((p) => p.category), ...list.flatMap((p) => p.categories)])]);
});

// GET /api/products/:id
products.get("/:id", (c) => {
  const product = getProducts().find((p) => p.id === c.req.param("id") && p.active !== false);
  if (!product) return c.json({ error: "Producto no encontrado" }, 404);
  return c.json(product);
});

export default products;
