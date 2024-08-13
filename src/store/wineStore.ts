import { create } from "zustand";

interface WineRerenderStore {
  isWineRerendered: boolean;
  isMyWineRerendered: boolean;
  setWineRerendered: (Rerendered: boolean) => void;
  setMyWineRerendered: (Rerendered: boolean) => void;
}

export const useWineRerenderStore = create<WineRerenderStore>((set) => ({
  isWineRerendered: false,
  isMyWineRerendered: false,
  setWineRerendered: (Rerendered: boolean) =>
    set({ isWineRerendered: Rerendered }),
  setMyWineRerendered: (Rerendered: boolean) =>
    set({ isMyWineRerendered: Rerendered }),
}));
