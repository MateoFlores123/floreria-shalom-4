const express = require("express");
const { getProducts } = require("../catalog");

const router = express.Router();

// GET /api/products?category=Rosas&search=rosas
router.get("/", (req, res) => {
  const { category, search } = req.query;
  let products = getProducts().filter((p) => p.active !== false);

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
  const products = getProducts().filter((p) => p.active !== false);
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

// GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = getProducts().find((p) => p.id === req.params.id && p.active !== false);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

module.exports = router;