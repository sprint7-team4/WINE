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
  isReviewCardRerendered: boolean;
  setReviewRerendered: (Rerendered: boolean) => void;
  setReviewCardRerendered: (Rerendered: boolean) => void;
}

export const useReviewRerenderStore = create<ReviewRerenderStore>((set) => ({
  isReviewRerendered: false,
  isReviewCardRerendered: false,
  setReviewRerendered: (Rerendered: boolean) =>
    set({ isReviewRerendered: Rerendered }),
  setReviewCardRerendered: (Rerendered: boolean) =>
    set({ isReviewCardRerendered: Rerendered }),
}));

interface FormStore {
  formType: REVIEW_MODE | null;
  setFormType: (type: REVIEW_MODE | null) => void;
}

export const useFormType = create<FormStore>((set) => ({
  formType: null,
  setFormType: (type: REVIEW_MODE | null) => set({ formType: type }),
}));

interface ReviewStore {
  reviewId: number | null;
  setReviewId: (id: number | null) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviewId: null,
  setReviewId: (id: number | null) => set({ reviewId: id }),
}));
