// WineListCardList.tsx
import { useWineStore } from "@/store/filteringStore";
import { useEffect, useState } from "react";
import WineListCard from "./WineListCard";
import { useWineFilter } from "@/hooks/useWineFilter";
import { useWineRerenderStore } from "@/store/wineStore";

const WineListCardList = () => {
  const { fetchWines, filteredWines } = useWineFilter();
  const { wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy } =
    useWineStore();
  const { isWineRerendered, setWineRerendered } = useWineRerenderStore();

  useEffect(() => {
    const loadWines = async () => {
      await fetchWines();
    };
    if (isWineRerendered) {
      setWineRerendered(false);
    }
    loadWines();
  }, [
    wineType,
    minPrice,
    maxPrice,
    ratingRange,
    searchTerm,
    sortBy,
    isWineRerendered,
  ]);
  return (
    <>
      {filteredWines.map((wine) => (
        <WineListCard key={wine.id} wine={wine} />
      ))}
    </>
  );
};

export default WineListCardList;
