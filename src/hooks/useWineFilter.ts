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
    async (cursor?: number | null) => {
      setIsLoading(true);

      const params: GetWinesParams = {
        limit: 10,
        cursor,
        type: wineType,
        minPrice,
        maxPrice,
        rating: undefined,
        name: searchTerm,
      };

      try {
        const response = await getWines(params);
        let newWineList: Wine[] = response.list;

        if (ratingRange[0] !== 0) {
          newWineList = newWineList.filter(
            (wine) =>
              wine.avgRating >= ratingRange[0] &&
              wine.avgRating < ratingRange[1]
          );
        }

        // 새로운 데이터만 정렬
        if (sortBy === "latest") {
          newWineList.sort(
            (a, b) =>
              new Date(b.recentReview?.updatedAt || "").getTime() -
              new Date(a.recentReview?.updatedAt || "").getTime()
          );
        } else if (sortBy === "mostReviews") {
          newWineList.sort((a, b) => b.reviewCount - a.reviewCount);
        } else if (sortBy === "priceHigh") {
          newWineList.sort((a, b) => b.price - a.price);
        } else if (sortBy === "priceLow") {
          newWineList.sort((a, b) => a.price - b.price);
        } else if (sortBy === "recommended") {
          newWineList.sort((a, b) => b.avgRating - a.avgRating);
        }

        // cursor가 없으면 초기 로드로 간주하여 데이터 초기화
        if (!cursor) {
          setFilteredWines(newWineList);
        } else {
          // cursor가 있으면 기존 데이터에 새 데이터 추가
          setFilteredWines((prevWines) => [...prevWines, ...newWineList]);
        }

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
