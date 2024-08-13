import { create } from "zustand";

interface State {
  modals: { [key: string]: boolean };
  openSecondModal: (id: string) => void;
  closeSecondModal: (id: string) => void;
}

const useModalSecondStore = create<State>((set) => ({
  modals: {},
  openSecondModal: (id: string) =>
    set((state) => ({
      modals: { ...state.modals, [id]: true },
    })),
  closeSecondModal: (id: string) =>
    set((state) => ({
      modals: { ...state.modals, [id]: false },
    })),
}));

export default useModalSecondStore;
