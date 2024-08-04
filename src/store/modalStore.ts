import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  opneModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
