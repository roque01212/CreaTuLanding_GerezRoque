import { createContext, useMemo, useState } from "react";
import { Product } from "../data/product";

interface Props {
  children: React.ReactNode;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  totalItems: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (item: number) => void;
  clearCart: () => void;

  increaseItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
}

export const CartContext = createContext({} as CartContextProps);

export const CartContextProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const totalItems = useMemo(() => {
    let total = 0;
    cart.forEach((item) => (total += item.quantity));
    return total;
  }, [cart]);

  const addItem = (product: Product, quantity: number) => {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.product.id === product.id);

      if (index >= 0) {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          quantity: copy[index].quantity + quantity,
        };
        return copy;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseItem = (productId: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const nextQTy = Math.min(item.product.stock, item.quantity + 1);
        return { ...item, quantity: nextQTy };
      })
    );
  };

  const decreaseItem = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;
          const nextQty = Math.max(0, item.quantity - 1);
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addItem,
        removeItem,
        clearCart,
        increaseItem,
        decreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
