import { create } from "zustand";

interface ILandingPageMenuState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const useLandingPageMenuStore = create<ILandingPageMenuState>((set) => ({
  isOpen: false,
  setIsOpen: (state: boolean) => set({ isOpen: state }),
}));

export default useLandingPageMenuStore;
