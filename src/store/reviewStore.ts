import { REVIEW_MODE } from "@/types/reviewTypes";
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

interface FormStore {
  formType: REVIEW_MODE;
  setFormType: (type: REVIEW_MODE) => void;
}

export const useFormType = create<FormStore>((set) => ({
  formType: REVIEW_MODE.EDIT,
  setFormType: (type: REVIEW_MODE) => set({ formType: type }),
}));
