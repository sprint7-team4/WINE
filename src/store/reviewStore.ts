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

interface ReviewSubmitStore {
  isReviewSubmitted: boolean;
  setReviewSubmitted: (submitted: boolean) => void;
}

export const useReviewSubmitStore = create<ReviewSubmitStore>((set) => ({
  isReviewSubmitted: false,
  setReviewSubmitted: (submitted: boolean) =>
    set({ isReviewSubmitted: submitted }),
}));