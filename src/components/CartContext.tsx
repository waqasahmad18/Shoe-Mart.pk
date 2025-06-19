import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string | null;
  color: string | null;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string | null, color: string | null) => void;
  updateQuantity: (id: string, size: string | null, color: string | null, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart-items');
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      // If same product, size, color exists, increase quantity
      const idx = prev.findIndex(
        i => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size: string | null, color: string | null) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
  };

  const updateQuantity = (id: string, size: string | null, color: string | null, quantity: number) => {
    setItems(prev => prev.map(i =>
      i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
} 