import { create } from "zustand";

export interface CardFood {
  nom: string;
  description: string;
  prix: number;
  pates: string[];
  quantity?: number;
}

interface CardStore {
  cardFood: CardFood | null;
  cart: CardFood[];
  addCard: (
    nom: string,
    description: string,
    prix: number,
    pates: string[]
  ) => void;
  addBasket: (item: CardFood) => void;
  removeFromCart: (nom: string) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cardFood: null,
  cart: [],
  addCard: (nom, description, prix, pates) =>
    set(() => ({
      cardFood: { nom, description, prix, pates },
    })),
  addBasket: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.nom === item.nom);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.nom === item.nom ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),
  removeFromCart: (nom) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.nom !== nom),
    })),
}));
