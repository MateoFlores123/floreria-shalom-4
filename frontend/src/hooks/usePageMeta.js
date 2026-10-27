import { useEffect } from "react";

// Título y descripción de cada página para Google y para la pestaña del navegador.
// (La página es una sola aplicación; esto cambia los datos al moverse entre secciones.)
const SITE_URL = "https://www.floreria-shalom.com";
const SUFFIX = " | Florería Shalom & Amor";

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
}

export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title.includes("Florería Shalom") ? title : `${title}${SUFFIX}`;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    if (path !== undefined) {
      setMeta('link[rel="canonical"]', "href", `${SITE_URL}${path}`);
      setMeta('meta[property="og:url"]', "content", `${SITE_URL}${path}`);
    }
  }, [title, description, path]);
}