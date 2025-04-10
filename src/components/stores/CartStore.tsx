import { create } from "zustand";
import { ICartItem } from "../../types/orders";

interface ICartStore {
  carts: ICartItem[];
  addToCart: (item: ICartItem) => void;
  increaseQty: (menuItemId: string) => void;
  decreaseQty: (menuItemId: string) => void;
  addNote: (menuItemId: string, note: string) => void;
  clear: () => void;
}

const useCartStore = create<ICartStore>((set, get) => ({
  carts: [],
  addToCart: (item) => {
    const id = item.menuItemId;
    const itemIsInCart = get().carts.find((menu) => menu.menuItemId === id);

    if (itemIsInCart) {
      set((state) => ({
        carts: state.carts.map((cartItem) =>
          cartItem.menuItemId === id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      }));
    } else {
      set((state) => ({
        carts: [...state.carts, item],
      }));
    }
  },
  increaseQty: (menuItemId) => {
    set((state) => ({
      carts: state.carts.map((cartItem) =>
        cartItem.menuItemId === menuItemId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    }));
  },
  decreaseQty: (menuItemId) => {
    set((state) => ({
      carts: state.carts
        .map((cartItem) =>
          cartItem.menuItemId === menuItemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    }));
  },
  addNote: (menuItemId, note) => {
    set((state) => ({
      carts: state.carts
        .map((cartItem) =>
          cartItem.menuItemId === menuItemId
            ? { ...cartItem, notes: note }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    }));
  },
  clear: () => {
    set({ carts: [] });
  },
}));

export default useCartStore;
