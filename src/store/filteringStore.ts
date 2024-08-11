// useWineStore.ts
import { create } from "zustand";
import { Wine } from "@/types/wineTypes";

interface WineState {
  wines: Wine[];
  sortBy: "latest" | "mostReviews" | "priceHigh" | "priceLow" | "recommended";
  wineType: "RED" | "WHITE" | "SPARKLING" | null;
  minPrice: number;
  maxPrice: number;
  ratingRange: [number, number];
  searchTerm: string;
  isLoading: boolean;
  totalCount: number;
  nextCursor: number | null;
  setWines: (wines: Wine[]) => void;
  setSortBy: (
    sort: "latest" | "mostReviews" | "priceHigh" | "priceLow" | "recommended"
  ) => void;
  setWineType: (type: "RED" | "WHITE" | "SPARKLING" | null) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setRatingRange: (range: [number, number]) => void;
  setSearchTerm: (term: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTotalCount: (count: number) => void;
  setNextCursor: (cursor: number | null) => void;
  resetFilters: () => void;
}

export const useWineStore = create<WineState>((set) => ({
  wines: [],
  sortBy: "latest",
  wineType: null,
  minPrice: 0,
  maxPrice: 100000,
  ratingRange: [0, 5],
  searchTerm: "",
  isLoading: false,
  totalCount: 0,
  nextCursor: null,
  setWines: (wines) => set({ wines }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setWineType: (type) => set({ wineType: type }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setRatingRange: (range) => set({ ratingRange: range }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTotalCount: (count) => set({ totalCount: count }),
  setNextCursor: (cursor) => set({ nextCursor: cursor }),
  resetFilters: () =>
    set({
      wineType: null,
      minPrice: 0,
      maxPrice: 100000,
      ratingRange: [0, 5],
      searchTerm: "",
      sortBy: "latest",
    }),
}));
