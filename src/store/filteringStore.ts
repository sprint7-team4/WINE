import { create } from "zustand";
import { getWines } from "@/lib/wineApi";
import { Wine, GetWinesResponse, GetWinesParams } from "@/types/wineTypes";

interface FilterState {
  wines: Wine[];
  sortBy: "latest" | "mostReviews" | "priceHigh" | "priceLow";
  wineType: "RED" | "WHITE" | "SPARKLING" | null;
  priceRange: [number, number];
  ratingRange: [number, number];
  isLoading: boolean;
  totalCount: number;
  nextCursor: number;
  fetchWines: () => Promise<void>;
  setSortBy: (
    sort: "latest" | "mostReviews" | "priceHigh" | "priceLow"
  ) => void;
  setWineTypes: (type: "RED" | "WHITE" | "SPARKLING" | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingRange: (range: [number, number]) => void;
}

export const useWineStore = create<FilterState>((set, get) => ({
  wines: [],
  sortBy: "latest",
  wineType: null,
  priceRange: [0, 100000],
  ratingRange: [0, 5],
  isLoading: false,
  totalCount: 0,
  nextCursor: 0,

  fetchWines: async () => {
    const { sortBy, wineType, priceRange, ratingRange, nextCursor } = get();
    set({ isLoading: true });

    const params: GetWinesParams = {
      limit: 10,
      type: wineType,
      cursor: nextCursor,
    };

    try {
      const response = await getWines(params);

      let filteredWines: Wine[] = response.list;

      // 클라이언트 측 필터링
      filteredWines = filteredWines.filter(
        (wine: Wine) =>
          wine.price >= priceRange[0] && wine.price <= priceRange[1]
      );

      filteredWines = filteredWines.filter(
        (wine: Wine) =>
          wine.avgRating >= ratingRange[0] && wine.avgRating <= ratingRange[1]
      );

      // 정렬 로직
      if (sortBy === "latest") {
        filteredWines = filteredWines.sort(
          (a, b) =>
            new Date(b.recentReview?.updatedAt || "").getTime() -
            new Date(a.recentReview?.updatedAt || "").getTime()
        );
      } else if (sortBy === "mostReviews") {
        filteredWines = filteredWines.sort(
          (a, b) => b.reviewCount - a.reviewCount
        );
      } else if (sortBy === "priceHigh") {
        filteredWines = filteredWines.sort((a, b) => b.price - a.price);
      } else if (sortBy === "priceLow") {
        filteredWines = filteredWines.sort((a, b) => a.price - b.price);
      }

      set({
        wines: filteredWines,
        totalCount: response.totalCount,
        nextCursor: response.nextCursor,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch wines:", error);
      set({ isLoading: false });
    }
  },

  setSortBy: (sort) => set({ sortBy: sort }),
  setWineTypes: (type) => set({ wineType: type }),
  setPriceRange: (range) => set({ priceRange: range }),
  setRatingRange: (range) => set({ ratingRange: range }),
}));
