// useWineFilter.ts
import { useCallback } from "react";
import { useWineStore } from "@/store/filteringStore";
import { getWines } from "@/lib/wineApi";
import { Wine, GetWinesParams } from "@/types/wineTypes";

export const useWineFilter = () => {
  const {
    wines,
    sortBy,
    wineType,
    priceRange,
    ratingRange,
    nextCursor,
    setWines,
    setIsLoading,
    setTotalCount,
    setNextCursor,
  } = useWineStore();

  const fetchWines = useCallback(async () => {
    setIsLoading(true);

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

      setWines(filteredWines);
      setTotalCount(response.totalCount);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error("Failed to fetch wines:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    sortBy,
    wineType,
    priceRange,
    ratingRange,
    nextCursor,
    setWines,
    setIsLoading,
    setTotalCount,
    setNextCursor,
  ]);

  return { fetchWines };
};
