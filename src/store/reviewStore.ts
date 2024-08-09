import { Wine } from "@/types/wineTypes";
import create from "zustand";

interface WineStore {
  wine: Wine | null;
  setWine: (wine: Wine) => void;
}

export const useWineStore = create<WineStore>((set) => ({
  wine: null,
  setWine: (wine) => set({ wine }),
}));

interface ReviewRerenderStore {
  isReviewRerendered: boolean;
  setReviewRerendered: (Rerendered: boolean) => void;
}

export const useReviewRerenderStore = create<ReviewRerenderStore>((set) => ({
  isReviewRerendered: false,
  setReviewRerendered: (Rerendered: boolean) =>
    set({ isReviewRerendered: Rerendered }),
}));
