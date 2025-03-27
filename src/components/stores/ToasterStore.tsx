import { create } from "zustand";

interface IToaster {
  type: string;
  message: string;
}

interface IToasterState {
  toaster: IToaster;
  setToaster: (toaster: IToaster) => void;
}

export const defaultToaster = {
  type: "",
  message: "",
};

const useToasterStore = create<IToasterState>((set) => ({
  toaster: defaultToaster,
  setToaster: (state: IToaster) =>
    set({ toaster: { type: state.type, message: state.message } }),
}));

export default useToasterStore;
