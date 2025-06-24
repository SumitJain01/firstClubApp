import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '../types';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  removeAllFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product: Product) => {
        const { cart } = get();
        const existing = cart.find((item) => item.id === product.id);

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            ),
          });
        } else {
          set({
            cart: [
              ...cart,
              {
                ...product,
                qty: 1,
                inStock: product.isInStock > 0,
              },
            ],
          });
        }
      },
      removeFromCart: (id: string) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0),
        })),
      removeAllFromCart: (id: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
