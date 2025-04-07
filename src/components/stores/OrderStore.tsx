import { create } from "zustand";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constants/list";

interface IOrderStore {
  currentLimit: number;
  currentPage: number;
  currentSearch: string;
  currentStatus: "PROCESSING" | "COMPLETED" | "";
  setLimit: (state: number) => void;
  setPage: (state: number) => void;
  setSearch: (state: string) => void;
  setStatus: (state: "PROCESSING" | "COMPLETED" | "") => void;
}

const useOrderStore = create<IOrderStore>((set) => ({
  currentLimit: parseInt(LIMIT_DEFAULT),
  currentPage: PAGE_DEFAULT,
  currentSearch: "",
  currentStatus: "",
  setLimit: (state) =>
    set({ currentLimit: state, currentPage: 1, currentStatus: "" }),
  setPage: (state) => set({ currentPage: state }),
  setSearch: (state) => set({ currentSearch: state, currentPage: 1 }),
  setStatus: (state) =>
    set({ currentStatus: state, currentPage: 1, currentSearch: "" }),
}));

export default useOrderStore;
