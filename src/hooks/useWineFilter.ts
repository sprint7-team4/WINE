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

  const findWinesRecursively = async (
    cursor?: number | null
  ): Promise<Wine[]> => {
    try {
      const response = await getWines({
        limit: 10,
        cursor,
        type: wineType,
        minPrice,
        maxPrice,
        rating: undefined,
        name: searchTerm,
      });

      // 현재 페이지에서 해당 별점 범위의 와인 필터링
      let filteredList = response.list;
      if (ratingRange[0] !== 0) {
        filteredList = response.list.filter(
          (wine) =>
            wine.avgRating >= ratingRange[0] && wine.avgRating < ratingRange[1]
        );
      }

      // 정렬 로직
      if (sortBy === "latest") {
        filteredList.sort(
          (a, b) =>
            new Date(b.recentReview?.updatedAt || "").getTime() -
            new Date(a.recentReview?.updatedAt || "").getTime()
        );
      } else if (sortBy === "mostReviews") {
        filteredList.sort((a, b) => b.reviewCount - a.reviewCount);
      } else if (sortBy === "priceHigh") {
        filteredList.sort((a, b) => b.price - a.price);
      } else if (sortBy === "priceLow") {
        filteredList.sort((a, b) => a.price - b.price);
      } else if (sortBy === "recommended") {
        filteredList.sort((a, b) => b.avgRating - a.avgRating);
      }

      // 필터링된 와인이 있거나 더 이상 다음 페이지가 없으면 현재 결과 반환
      if (filteredList.length > 0 || !response.nextCursor) {
        setNextCursor(response.nextCursor);
        return filteredList;
      }

      // 필터링된 와인이 없고 다음 페이지가 있으면 재귀적으로 다음 페이지 호출
      return findWinesRecursively(response.nextCursor);
    } catch (error) {
      console.error("Failed to fetch wines:", error);
      return [];
    }
  };

  const fetchWines = useCallback(
    async (cursor?: number | null) => {
      setIsLoading(true);

      try {
        if (!cursor) {
          // 초기 로드나 필터 변경시에는 재귀적으로 찾기
          const wines = await findWinesRecursively(cursor);
          setFilteredWines(wines);
        } else {
          // 스크롤로 추가 데이터 요청시에는 한 번만 호출
          const wines = await findWinesRecursively(cursor);
          setFilteredWines((prev) => [...prev, ...wines]);
        }
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

  return { fetchWines, filteredWines, setFilteredWines };
};
