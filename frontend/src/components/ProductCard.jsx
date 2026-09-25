import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ProductPlaceholder } from "./BotanicalArt";
import { MinusIcon, PlusIcon, ArrowRightIcon } from "./icons";

export default function ProductCard({ product, featured = false }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);

  const increment = () => setQuantity((q) => Math.min(q + 1, 20));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <article className={`product-card ${featured ? "product-card--featured" : ""}`}>
      <div className="product-card__media" style={{ background: `${product.color || "#b95c73"}18` }}>
        {product.image && !imageFailed ? (
          <img
            src={product.image}
            alt={product.imageAlt || product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProductPlaceholder color={product.color} />
        )}
        <span className="product-card__tag">Foto referencial</span>
        {product.oldPrice && <span className="product-card__discount">Oferta</span>}
      </div>
      <div className="product-card__body">
        <div className="product-card__category">{product.category}</div>
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__price-row">
          {product.oldPrice && <span className="price--old">S/ {product.oldPrice.toFixed(2)}</span>}
          <span className="price">S/ {product.price.toFixed(2)}</span>
        </div>
        <div className="product-card__actions">
          <div className="qty-stepper" aria-label={`Cantidad para ${product.name}`}>
            <button type="button" onClick={decrement} aria-label="Reducir cantidad"><MinusIcon size={13} /></button>
            <span>{quantity}</span>
            <button type="button" onClick={increment} aria-label="Aumentar cantidad"><PlusIcon size={13} /></button>
          </div>
          <button className="product-card__buy" onClick={() => addItem(product, quantity)}>
            <span>Añadir</span><ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
