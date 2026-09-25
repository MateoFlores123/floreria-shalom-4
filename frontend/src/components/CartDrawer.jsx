import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from "./icons";

export default function CartDrawer() {
  const { items, totals, isOpen, closeCart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  function goToCheckout() {
    closeCart();
    navigate("/carrito");
  }

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <aside className="cart-drawer" role="dialog" aria-label="Carrito de compras">
        <div className="cart-drawer__head">
          <h3>Tu carrito</h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer__items">
          {items.length === 0 && (
            <div className="empty-state">
              <p>Tu carrito está vacío por ahora.</p>
              <p>Explora el catálogo y elige el arreglo perfecto 🌷</p>
            </div>
          )}

          {items.map((item) => (
            <div className="cart-line" key={item.productId}>
              <div className="cart-line__swatch" style={{ background: item.color || "#c4406b" }} />
              <div>
                <p className="cart-line__name">{item.name}</p>
                <p className="cart-line__price">S/ {item.price.toFixed(2)}</p>
                <div className="qty-stepper" style={{ marginTop: 6 }}>
                  <button onClick={() => updateQty(item.productId, item.qty - 1)} aria-label="Restar">
                    <MinusIcon size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, item.qty + 1)} aria-label="Sumar">
                    <PlusIcon size={14} />
                  </button>
                </div>
              </div>
              <button className="icon-btn" onClick={() => removeItem(item.productId)} aria-label="Quitar producto">
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-drawer__total">
              <span>Subtotal</span>
              <span>S/ {totals.subtotal.toFixed(2)}</span>
            </div>
            <p className="muted" style={{ fontSize: "0.82rem" }}>
              El costo de delivery se calcula en el siguiente paso.
            </p>
            <button className="btn btn-accent btn-block" onClick={goToCheckout}>
              Continuar compra
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
