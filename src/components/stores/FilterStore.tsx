import { create } from "zustand";

interface IButtonFilterState {
  isFiltered: string;
  setIsFiltered: (state: string) => void;
}

const useFilterStore = create<IButtonFilterState>((set) => ({
  isFiltered: "",
  setIsFiltered: (state) => set({ isFiltered: state }),
}));

export default useFilterStore;
