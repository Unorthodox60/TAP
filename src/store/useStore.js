import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth State
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),

      // Cart State
      cart: [],
      addToCart: (product, weight, price) => set((state) => {
        const existing = state.cart.find(
          (item) => item.id === product.id && item.weight === weight
        );
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id && item.weight === weight
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          cart: [...state.cart, { ...product, weight, price, quantity: 1 }],
        };
      }),
      removeFromCart: (productId, weight) => set((state) => ({
        cart: state.cart.filter((item) => !(item.id === productId && item.weight === weight)),
      })),
      updateQuantity: (productId, weight, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId && item.weight === weight
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),
      clearCart: () => set({ cart: [] }),
      
      // UI State
      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      isAuthOpen: false,
      setIsAuthOpen: (isOpen) => set({ isAuthOpen: isOpen }),
    }),
    {
      name: 'triveni-store',
      partialize: (state) => ({ cart: state.cart }), // Persist only cart in local storage
    }
  )
);
