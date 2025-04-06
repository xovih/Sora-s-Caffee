import { create } from "zustand";

interface IButtonFilterState {
  catSelected: string;
  currentPage: number;
  currentSearch: string;
  setCatSelected: (state: string) => void;
  setPage: (state: number) => void;
  setSearch: (state: string) => void;
}

const useFilterStore = create<IButtonFilterState>((set) => ({
  catSelected: "",
  currentPage: 1,
  currentSearch: "",
  setCatSelected: (state) =>
    set({ catSelected: state, currentPage: 1, currentSearch: "" }),
  setPage: (state) => set({ currentPage: state, currentSearch: "" }),
  setSearch: (state) => set({ currentSearch: state, currentPage: 1 }),
}));

export default useFilterStore;
