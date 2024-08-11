import { create } from "zustand";

type StarRatingState = {
  ratingFilter: string;
  setRatingFilter: (filter: string) => void;
};

export const useStarRatingStore = create<StarRatingState>((set) => ({
  ratingFilter: "all",
  setRatingFilter: (filter) => set({ ratingFilter: filter }),
}));
