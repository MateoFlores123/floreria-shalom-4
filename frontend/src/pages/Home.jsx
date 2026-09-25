import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import CategoryShortcuts from "../components/CategoryShortcuts";
import Reveal from "../components/Reveal";
import { CATEGORY_SHORTCUTS } from "../data/promos";
import { SITE } from "../data/site";
import { MEDIA } from "../data/media";
import { HeartIcon, WhatsAppIcon, ArrowRightIcon } from "../components/icons";
import "../styles/home-hero.css";

const OCCASIONS = ["Amor", "Cumpleaños", "Aniversario", "Condolencias", "Amistad", "Agradecimiento"];

// Muestra la imagen; si falla la carga, deja un fondo de color (el texto lo pone la tarjeta).
function HeroMedia({ src, alt = "", priority = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="hero-mosaic__fallback" aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="hero-mosaic__image"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

// Las 4 tarjetas secundarias del hero. La clase --{key} ya existe en tu CSS.
const HERO_TILES = [
  {
    key: "flores",
    to: "/catalogo",
    src: MEDIA.hero.flores,
    alt: "Arreglos florales de la florería",
    label: "FLORES",
    title: "Hechas para regalar.",
  },
  {
    key: "detalles",
    to: "/catalogo?categoria=Combos",
    src: MEDIA.hero.detalles,
    alt: "Detalles florales para regalar",
    label: "DETALLES",
    title: "Flores + algo más.",
  },
  {
    key: "combos",
    to: "/catalogo?categoria=Combos",
    src: MEDIA.hero.combos,
    alt: "Combos florales para sorprender",
    label: "COMBOS",
    title: "Para sorprender.",
  },
  {
    key: "temporada",
    to: "/catalogo?categoria=Variadas",
    src: MEDIA.hero.temporada,
    alt: "Flores de estación",
    label: "FLORES DE ESTACIÓN",
    title: "Lo que está floreciendo.",
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((data) => setProducts(data.filter((p) => p.active !== false)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Siete piezas para que la grilla tenga ritmo y no parezca una fila de tarjetas repetidas.
  const featured = products.slice(0, 7);

  return (
    <main className="home-page">
      <section className="hero-mosaic" aria-labelledby="home-hero-title">
        <div className="container">
          <div className="hero-mosaic__grid">
            {/* Recuadro de texto: hero-sincomplicaciones.webp de fondo */}
            <article className="hero-mosaic__intro">
              <HeroMedia src={MEDIA.hero.sinComplicaciones} />
              <div className="hero-mosaic__intro-content">
                <span className="eyebrow eyebrow--dark">Colección · Arequipa · 2026</span>
                <h1 id="home-hero-title">Los favoritos, sin complicaciones.</h1>
                <p>
                  Flores bonitas, detalles que se sienten y una compra sencilla. Elige tu favorito y
                  nosotros nos encargamos del resto.
                </p>
                <div className="hero-mosaic__actions">
                  <Link to="/catalogo" className="btn btn-primary">
                    Ver favoritos <ArrowRightIcon size={17} />
                  </Link>
                  <Link to="/catalogo?ocasion=Amor" className="text-link text-link--dark">
                    Buscar por ocasión →
                  </Link>
                </div>
                <div className="hero-mosaic__meta">
                  <span><b>01</b> Selecciona</span>
                  <span><b>02</b> Personaliza</span>
                  <span><b>03</b> Recibe</span>
                </div>
              </div>
            </article>

            {/* Imagen principal: hero-favorites.webp */}
            <Link to="/catalogo" className="hero-mosaic__main-media" aria-label="Ver favoritos">
              <HeroMedia
                src={MEDIA.hero.favorites}
                alt="Productos favoritos de la florería"
                priority
              />
              <div className="hero-mosaic__media-copy">
                <span>01 / FAVORITOS</span>
                <strong>Los favoritos para regalar.</strong>
              </div>
            </Link>

            {/* Tarjetas: flores, detalles, combos, temporada */}
            {HERO_TILES.map((tile) => (
              <Link
                key={tile.key}
                to={tile.to}
                className={`hero-mosaic__tile hero-mosaic__tile--${tile.key}`}
              >
                <HeroMedia src={tile.src} alt={tile.alt} />
                <div className="hero-mosaic__tile-copy">
                  <span>{tile.label}</span>
                  <strong>{tile.title}</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reveal>
        <CategoryShortcuts items={CATEGORY_SHORTCUTS} />
      </Reveal>

      <section className="occasion-rail">
        <div className="container">
          <div className="occasion-rail__inner">
            <span className="occasion-rail__label">Buscar por ocasión</span>
            <div className="occasion-rail__list">
              {OCCASIONS.map((occ) => (
                <Link key={occ} to={`/catalogo?ocasion=${encodeURIComponent(occ)}`} className="occasion-link">
                  {occ}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="section home-feature-section">
        <div className="container">
          <div className="section-head home-section-head">
            <div>
              <span className="eyebrow eyebrow--dark">Nuestra selección</span>
              <h2>Los favoritos, sin complicaciones.</h2>
              <p>Una colección pensada para regalar bonito, con precios claros y una compra rápida.</p>
            </div>
            <Link to="/catalogo" className="btn btn-outline">Ver colección completa <ArrowRightIcon size={16} /></Link>
          </div>

          {loading && <p className="muted">Cargando colección…</p>}
          {!loading && products.length === 0 && (
            <div className="empty-state card">
              No pudimos cargar el catálogo, intenta de nuevo en unos minutos.
            </div>
          )}

          <div className="mosaic-products">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} featured={index === 0} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section section--innovation">
        <div className="container">
          <div className="innovation-heading">
            <div>
              <span className="eyebrow eyebrow--dark">Lo que estamos creando</span>
              <h2>Creatividad e innovación en Florería Shalom</h2>
            </div>
            <p>Un espacio para mostrar nuevas ideas, técnicas, colecciones y experiencias que hacen diferente cada detalle.</p>
          </div>

          <div className="innovation-grid">
            <article className="innovation-card innovation-card--large">
              <img src={MEDIA.innovation.first} alt="Innovación floral 01" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div className="innovation-card__overlay">
                <span>01 / NUEVAS IDEAS</span>
                <h3>Diseños que salen de lo habitual.</h3>
              </div>
            </article>

            <article className="innovation-card">
              <img src={MEDIA.innovation.second} alt="Innovación floral 02" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div className="innovation-card__overlay">
                <span>02 / DISEÑO</span>
                <h3>Nuevas formas de presentar flores.</h3>
              </div>
            </article>

            <article className="innovation-card">
              <img src={MEDIA.innovation.third} alt="Innovación floral 03" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              <div className="innovation-card__overlay">
                <span>03 / EXPERIENCIA</span>
                <h3>Detalles pensados para sorprender.</h3>
              </div>
            </article>

            <article className="innovation-card innovation-card--whatsapp">
              <div>
                <span className="eyebrow eyebrow--dark">¿Tienes una idea?</span>
                <h3>Cuéntanos para quién es y te ayudamos a convertirla en un detalle.</h3>
              </div>
              <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                <WhatsAppIcon size={18} /> Hablar por WhatsApp <ArrowRightIcon size={16} />
              </a>
            </article>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section home-process">
        <div className="container">
          <div className="home-process__head">
            <div>
              <span className="eyebrow eyebrow--dark">Compra en tres pasos</span>
              <h2>Simple por fuera. Cuidado por dentro.</h2>
            </div>
            <HeartIcon size={28} />
          </div>
          <div className="process-grid">
            <div><span>01</span><h3>Elige</h3><p>Encuentra un arreglo o filtra por ocasión.</p></div>
            <div><span>02</span><h3>Personaliza</h3><p>Completa entrega, horario y dedicatoria.</p></div>
            <div><span>03</span><h3>Confirma</h3><p>Recibe el resumen y coordina el pago por WhatsApp.</p></div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}