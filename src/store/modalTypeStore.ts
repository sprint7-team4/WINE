// modalStore.ts
import { create } from "zustand";

type ModalType = "filter" | "wineRegistration" | null;

interface State {
  isOpenModal: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const useModalTypeStore = create<State>((set) => ({
  isOpenModal: false,
  modalType: null,
  openModal: (type) => set({ isOpenModal: true, modalType: type }),
  closeModal: () => set({ isOpenModal: false, modalType: null }),
}));

export default useModalTypeStore;
