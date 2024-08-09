// useWineStore.ts
import { create } from "zustand";
import { Wine } from "@/types/wineTypes";

interface WineState {
  wines: Wine[];
  sortBy: "latest" | "mostReviews" | "priceHigh" | "priceLow";
  wineType: "RED" | "WHITE" | "SPARKLING" | null;
  priceRange: [number, number];
  ratingRange: [number, number];
  isLoading: boolean;
  totalCount: number;
  nextCursor: number;
  setWines: (wines: Wine[]) => void;
  setSortBy: (
    sort: "latest" | "mostReviews" | "priceHigh" | "priceLow"
  ) => void;
  setWineTypes: (type: "RED" | "WHITE" | "SPARKLING" | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingRange: (range: [number, number]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTotalCount: (count: number) => void;
  setNextCursor: (cursor: number) => void;
}

export const useWineStore = create<WineState>((set) => ({
  wines: [],
  sortBy: "latest",
  wineType: null,
  priceRange: [0, 100000],
  ratingRange: [0, 5],
  isLoading: false,
  totalCount: 0,
  nextCursor: 0,
  setWines: (wines) => set({ wines }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setWineTypes: (type) => set({ wineType: type }),
  setPriceRange: (range) => set({ priceRange: range }),
  setRatingRange: (range) => set({ ratingRange: range }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTotalCount: (count) => set({ totalCount: count }),
  setNextCursor: (cursor) => set({ nextCursor: cursor }),
}));
