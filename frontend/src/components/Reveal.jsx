import { useEffect, useRef, useState } from "react";

// Envoltorio simple para animar secciones cuando entran en pantalla
// (fade + desplazamiento sutil hacia arriba). No agrega dependencias:
// usa IntersectionObserver del navegador.
//
// Uso: <Reveal><section>...</section></Reveal>
// Uso con retraso escalonado: <Reveal delay={120}>...</Reveal>
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
