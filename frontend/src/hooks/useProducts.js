import { useEffect, useState } from "react";
import { api } from "../api/client";

// Catálogo compartido entre páginas: se descarga una sola vez y queda en memoria
// mientras la persona navega (Inicio → Catálogo → Carrito… sin volver a esperar).
// Además se guarda en el navegador para mostrarlo al instante en la próxima visita
// y se actualiza por detrás con la versión más nueva.

const STORAGE_KEY = "shalom_catalog_v1";
let cache = null; // lista ya descargada en esta visita
let inflight = null; // descarga en curso (evita pedirla dos veces)

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function fetchProducts() {
  if (!inflight) {
    inflight = api
      .get("/products")
      .then((list) => {
        cache = list.filter((p) => p.active !== false);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
        } catch {
          /* sin almacenamiento: no pasa nada */
        }
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

// Categorías en el orden en que aparecen (principal primero, luego las secundarias)
export function categoriesOf(products) {
  return [
    ...new Set([
      ...products.map((p) => p.category),
      ...products.flatMap((p) => p.categories || [p.category]),
    ]),
  ].filter(Boolean);
}

export function useProducts() {
  const [products, setProducts] = useState(() => cache || readStored() || []);
  const [loading, setLoading] = useState(() => !cache && !readStored());
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache) return undefined; // ya está fresco en esta visita
    let alive = true;
    fetchProducts()
      .then((list) => alive && setProducts(list))
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return { products, loading, error };
}