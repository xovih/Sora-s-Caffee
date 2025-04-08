import { create } from "zustand";

interface IAutocompleteStore {
  value: string;
  setValue: (state: string) => void;
  text: string;
  setText: (state: string) => void;
}

const useAutocompleteStore = create<IAutocompleteStore>((set) => ({
  value: "",
  setValue: (state) => set({ value: state }),
  text: "",
  setText: (state) => set({ text: state }),
}));

export default useAutocompleteStore;
