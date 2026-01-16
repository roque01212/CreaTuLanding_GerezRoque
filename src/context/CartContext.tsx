import { createContext, useEffect, useMemo, useState } from "react";
import { Product } from "../data/product";

interface Props {
  children: React.ReactNode;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  carts: CartItem[];
  totalItems: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (item: number) => void;
  clearCart: () => void;

  increaseItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
}

export const CartContext = createContext({} as CartContextProps);

const getCartLocalStorage = (): CartItem[] => {
  const carts = localStorage.getItem("Cart-Product");

  return carts ? JSON.parse(carts) : [];
};

export const CartContextProvider = ({ children }: Props) => {
  const [carts, setCarts] = useState<CartItem[]>(getCartLocalStorage());

  const totalItems = useMemo(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    return total;
  }, [carts]);

  const addItem = (product: Product, quantity: number) => {
    setCarts((prev) => {
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
    setCarts((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCarts([]);
  };

  const increaseItem = (productId: number) => {
    setCarts((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const nextQTy = Math.min(item.product.stock, item.quantity + 1);
        return { ...item, quantity: nextQTy };
      }),
    );
  };

  const decreaseItem = (productId: number) => {
    setCarts((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;
          const nextQty = Math.max(0, item.quantity - 1);
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  useEffect(() => {
    localStorage.setItem("Cart-Product", JSON.stringify(carts));
  }, [carts]);

  return (
    <CartContext.Provider
      value={{
        carts,
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
