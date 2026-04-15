"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getProductBySlug } from "@/data/products";

export type CartItem = {
  productSlug: string;
  optionLabel: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productSlug: string, optionLabel: string, quantity: number) => void;
  removeItem: (productSlug: string, optionLabel: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "gimpo-youth-mall-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;

    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: (nextItem) => {
        setItems((current) => {
          const found = current.find(
            (item) => item.productSlug === nextItem.productSlug && item.optionLabel === nextItem.optionLabel,
          );

          if (!found) {
            return [...current, nextItem];
          }

          return current.map((item) =>
            item.productSlug === nextItem.productSlug && item.optionLabel === nextItem.optionLabel
              ? { ...item, quantity: item.quantity + nextItem.quantity }
              : item,
          );
        });
      },
      updateQuantity: (productSlug, optionLabel, quantity) => {
        setItems((current) =>
          current
            .map((item) =>
              item.productSlug === productSlug && item.optionLabel === optionLabel
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (productSlug, optionLabel) => {
        setItems((current) =>
          current.filter((item) => !(item.productSlug === productSlug && item.optionLabel === optionLabel)),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export function getCartDisplayItems(items: CartItem[]) {
  return items
    .map((item) => {
      const product = getProductBySlug(item.productSlug);
      if (!product) return null;

      const option = product.options.find((entry) => entry.label === item.optionLabel) ?? product.options[0];

      return {
        ...item,
        product,
        unitPrice: option.price,
        totalPrice: option.price * item.quantity,
      };
    })
    .filter(Boolean) as Array<{
    productSlug: string;
    optionLabel: string;
    quantity: number;
    product: NonNullable<ReturnType<typeof getProductBySlug>>;
    unitPrice: number;
    totalPrice: number;
  }>;
}
