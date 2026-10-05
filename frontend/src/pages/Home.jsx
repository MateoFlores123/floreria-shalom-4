import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import ShopByCategory from "../components/ShopByCategory";
import Reveal from "../components/Reveal";
import HeroBloom from "../components/HeroBloom";
import { LogoLoader, SectionOrnament } from "../components/Brand";
import { CATEGORY_SHORTCUTS } from "../data/promos";
import { SITE } from "../data/site";
import { MEDIA } from "../data/media";
import { HeartIcon, WhatsAppIcon, ArrowRightIcon } from "../components/icons";
import "../styles/home-hero.css";


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
    <div className="home-page">
      <HeroBloom />

      <Reveal>
        <ShopByCategory items={CATEGORY_SHORTCUTS} />
      </Reveal>

      <SectionOrnament />

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

          {loading && <LogoLoader label="Cargando colección…" />}
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
    </div>
  );
}