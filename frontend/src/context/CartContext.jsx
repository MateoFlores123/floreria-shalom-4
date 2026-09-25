import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "halon4_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((it) => it.productId === product.id);
      if (existing) {
        return prev.map((it) =>
          it.productId === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }

  function updateQty(productId, qty) {
    setItems((prev) =>
      prev
        .map((it) => (it.productId === productId ? { ...it, qty: Math.max(1, qty) } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((it) => it.productId !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const totals = useMemo(() => {
    const count = items.reduce((sum, it) => sum + it.qty, 0);
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.price, 0);
    return { count, subtotal };
  }, [items]);

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    totals,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
