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
} from "./icons";

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

// Franja de accesos rápidos por tipo de producto (ramos, cajas, box,
// listones, flores secas, etc.), para dejar claro desde el inicio que la
// tienda no son solo ramos. Datos editables en src/data/promos.js.
export default function CategoryShortcuts({ items = [] }) {
  if (items.length === 0) return null;
  return (
    <section className="category-shortcuts">
      <div className="container">
        <div className="category-shortcuts__list">
          {items.map((item) => {
            const Icon = ICONS[item.icon] || SparkleIcon;
            return (
              <Link key={item.label} to={item.link} className="category-shortcut">
                <span className="category-shortcut__icon">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="category-shortcut__image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                      }}
                    />
                  ) : null}
                  <span className="category-shortcut__icon-fallback" hidden={Boolean(item.image)}>
                    <Icon size={26} />
                  </span>
                </span>
                <span className="category-shortcut__label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
