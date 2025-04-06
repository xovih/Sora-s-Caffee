import { create } from "zustand";

interface ISearchFilterStore {
  currentSearch: string;
  setSearch: (state: string) => void;
}

const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  currentSearch: "",
  setSearch: (state) =>
    set({
      currentSearch: state,
    }),
}));

export default useSearchFilterStore;
