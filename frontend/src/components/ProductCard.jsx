import { useState } from "react";
import { useCart } from "../context/CartContext";
import { SITE } from "../data/site";
import { BrandMark } from "./Brand";
import { MinusIcon, PlusIcon, ArrowRightIcon, WhatsAppIcon } from "./icons";

// Un producto tiene precio publicado si "price" es un número mayor a 0.
export function hasPrice(product) {
  return typeof product.price === "number" && product.price > 0;
}

export default function ProductCard({ product, featured = false }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);
  const priced = hasPrice(product);

  const increment = () => setQuantity((q) => Math.min(q + 1, 20));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  const askText = encodeURIComponent(
    `Hola Florería Shalom 🌸 Quisiera saber el precio de: ${product.name}`
  );

  return (
    <article className={`product-card ${featured ? "product-card--featured" : ""}`}>
      <div className="product-card__media" style={{ background: `${product.color || "#b95c73"}18` }}>
        {product.image && !imageFailed ? (
          <>
            <img
              src={product.image}
              alt={product.imageAlt || product.name}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
            <span className="product-card__tag">Foto referencial</span>
          </>
        ) : (
          // Sin foto todavía: el logo sobre el color del producto
          <div className="product-card__nophoto" style={{ "--tint": product.color || "#be6981" }}>
            <BrandMark />
            <span>Foto próximamente</span>
          </div>
        )}
        {priced && product.oldPrice && <span className="product-card__discount">Oferta</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__category">{product.category}</div>
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__price-row">
          {priced ? (
            <>
              {product.oldPrice && <span className="price--old">S/ {product.oldPrice.toFixed(2)}</span>}
              <span className="price">S/ {product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price price--pending">Precio por confirmar</span>
          )}
        </div>
        <div className="product-card__actions">
          {priced ? (
            <>
              <div className="qty-stepper" aria-label={`Cantidad para ${product.name}`}>
                <button type="button" onClick={decrement} aria-label="Reducir cantidad"><MinusIcon size={13} /></button>
                <span>{quantity}</span>
                <button type="button" onClick={increment} aria-label="Aumentar cantidad"><PlusIcon size={13} /></button>
              </div>
              <button className="product-card__buy" onClick={() => addItem(product, quantity)}>
                <span>Añadir</span><ArrowRightIcon size={16} />
              </button>
            </>
          ) : (
            <a
              className="product-card__buy product-card__ask"
              href={`https://wa.me/${SITE.whatsappNumber}?text=${askText}`}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={15} /><span>Consultar precio</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}