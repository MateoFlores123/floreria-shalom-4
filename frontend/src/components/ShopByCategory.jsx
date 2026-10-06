import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BouquetIcon,
  HeartIcon,
  GiftIcon,
  BoxIcon,
  RibbonIcon,
  DriedFlowerIcon,
  SparkleIcon,
  LeafIcon,
  ArrowRightIcon,
} from "./icons";
import "../styles/home-categories.css";

const ICONS = {
  bouquet: BouquetIcon,
  heart: HeartIcon,
  gift: GiftIcon,
  box: BoxIcon,
  ribbon: RibbonIcon,
  dried: DriedFlowerIcon,
  sparkle: SparkleIcon,
  leaf: LeafIcon,
};

const OCCASIONS = [
  "Amor",
  "Cumpleaños",
  "Aniversario",
  "Amistad",
  "Agradecimiento",
  "Nacimiento",
  "Graduación",
  "Condolencias",
];

// Intenta la foto de la categoría; si no existe, usa la foto de respaldo;
// si tampoco hay, muestra el ícono sobre un fondo suave.
function CategoryArt({ item }) {
  const sources = [item.image, item.fallbackImage].filter(Boolean);
  const [index, setIndex] = useState(0);
  const Icon = ICONS[item.icon] || SparkleIcon;

  if (index >= sources.length) {
    return (
      <span className="cats__icon" aria-hidden="true">
        <Icon size={34} />
      </span>
    );
  }

  return (
    <img
      src={sources[index]}
      alt=""
      loading="lazy"
      decoding="async"
      className="cats__img"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}

export default function ShopByCategory({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <section className="cats" aria-labelledby="cats-title">
      <div className="container">
        <div className="cats__head">
          <h2 id="cats-title">¿Qué quieres regalar?</h2>
          <Link to="/catalogo" className="cats__all">
            Ver todo el catálogo <ArrowRightIcon size={15} />
          </Link>
        </div>

        <ul className="cats__list">
          {items.map((item, i) => (
            <li key={item.label} className="cats__item" style={{ "--i": i }}>
              <Link to={item.link} className={`cats__link cats__tone--${i % 4}`}>
                <span className="cats__arch">
                  <CategoryArt item={item} />
                </span>
                <span className="cats__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <nav className="occasions" aria-label="Buscar por ocasión">
          <span className="occasions__label">Para cada ocasión</span>
          <ul className="occasions__list">
            {OCCASIONS.map((occ) => (
              <li key={occ}>
                <Link to={`/catalogo?ocasion=${encodeURIComponent(occ)}`} className="occasions__link">
                  {occ}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}