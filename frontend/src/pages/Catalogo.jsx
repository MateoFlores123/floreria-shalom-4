import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import FloralOrnament from "../components/FloralOrnament";

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const activeCategory = searchParams.get("categoria") || "Todas";
  const activeOccasion = searchParams.get("ocasion") || "";

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then(setAllProducts)
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
    api.get("/products/categories").then(setCategories).catch(() => setCategories([]));
  }, []);

  const filtered = useMemo(() => {
    let list = allProducts;
    if (activeCategory !== "Todas") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeOccasion) {
      list = list.filter((p) => (p.occasion || []).includes(activeOccasion));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProducts, activeCategory, activeOccasion, search]);

  function setCategory(cat) {
    const params = new URLSearchParams(searchParams);
    if (cat === "Todas") params.delete("categoria");
    else params.set("categoria", cat);
    setSearchParams(params);
  }

  function clearOccasion() {
    const params = new URLSearchParams(searchParams);
    params.delete("ocasion");
    setSearchParams(params);
  }

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="page-hero">
        <FloralOrnament variant="wreath" style={{ width: 160, height: 40, marginBottom: 6 }} />
        <h1>Catálogo</h1>
        <p>Ramos, cajas y arreglos disponibles para entrega el mismo día en Arequipa.</p>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "28px 0", alignItems: "center" }}>
        <div className="field" style={{ marginBottom: 0, minWidth: 220 }}>
          <input
            type="search"
            placeholder="Buscar por nombre o descripción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className={`occasion-chip ${activeCategory === "Todas" ? "active" : ""}`}
          onClick={() => setCategory("Todas")}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`occasion-chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}

        {activeOccasion && (
          <span className="badge" style={{ cursor: "pointer" }} onClick={clearOccasion}>
            Ocasión: {activeOccasion} ✕
          </span>
        )}
      </div>

      {loading && <p className="muted">Cargando catálogo…</p>}
      {!loading && filtered.length === 0 && (
        <p className="muted">No encontramos productos con esos filtros. Prueba con otra búsqueda.</p>
      )}

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
