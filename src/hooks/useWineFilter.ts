// useWineFilter.ts
import { useCallback, useState } from "react";
import { useWineStore } from "@/store/filteringStore";
import { getWines } from "@/lib/wineApi";
import { Wine, GetWinesParams } from "@/types/wineTypes";

export const useWineFilter = () => {
  const {
    sortBy,
    wineType,
    minPrice,
    maxPrice,
    ratingRange,
    searchTerm,
    setIsLoading,
    setTotalCount,
    setNextCursor,
  } = useWineStore();

  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);

  const fetchWines = useCallback(
    async (cursor?: number) => {
      setIsLoading(true);

      const params: GetWinesParams = {
        limit: 10,
        cursor,
        type: wineType,
        minPrice,
        maxPrice,
        rating: ratingRange[0],
        name: searchTerm,
      };

      try {
        const response = await getWines(params);

        let wineList: Wine[] = response.list;

        console.log("와인리스트 :::", wineList);

        // 클라이언트 측 정렬
        if (sortBy === "latest") {
          wineList.sort(
            (a, b) =>
              new Date(b.recentReview?.updatedAt || "").getTime() -
              new Date(a.recentReview?.updatedAt || "").getTime()
          );
        } else if (sortBy === "mostReviews") {
          wineList.sort((a, b) => b.reviewCount - a.reviewCount);
        } else if (sortBy === "priceHigh") {
          wineList.sort((a, b) => b.price - a.price);
        } else if (sortBy === "priceLow") {
          wineList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "recommended") {
          wineList.sort((a, b) => b.avgRating - a.avgRating);
        }

        setFilteredWines(wineList);
        setTotalCount(response.totalCount);
        setNextCursor(response.nextCursor);
      } catch (error) {
        console.error("Failed to fetch wines:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      sortBy,
      wineType,
      minPrice,
      maxPrice,
      ratingRange,
      searchTerm,
      setIsLoading,
      setTotalCount,
      setNextCursor,
    ]
  );

  return { fetchWines, filteredWines };
};
