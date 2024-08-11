// modalStore.ts
import { create } from "zustand";

type ModalType = "filter" | "wineRegistration" | null;

interface State {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const useSideModalStore = create<State>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));

export default useSideModalStore;
