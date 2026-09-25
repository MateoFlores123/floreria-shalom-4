const express = require("express");
const { getCollection } = require("../db");

const router = express.Router();

// GET /api/products?category=Rosas&search=rosas
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let products = getCollection("products").filter((p) => p.active !== false);

  if (category && category !== "Todas") {
    products = products.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  res.json(products);
});

// GET /api/products/categories
router.get("/categories", (req, res) => {
  const products = getCollection("products");
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const products = getCollection("products");
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

module.exports = router;
