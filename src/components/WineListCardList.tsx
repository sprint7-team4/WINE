// WineListCardList.tsx
import { useWineStore } from "@/store/filteringStore";
import { useEffect, useState } from "react";
import WineListCard from "./WineListCard";
import { useWineFilter } from "@/hooks/useWineFilter";

const WineListCardList = () => {
  const { fetchWines, filteredWines } = useWineFilter();
  const { wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy } =
    useWineStore();

  useEffect(() => {
    const loadWines = async () => {
      await fetchWines();
    };

    loadWines();
  }, [wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy]);
  return (
    <>
      {filteredWines.map((wine) => (
        <WineListCard key={wine.id} wine={wine} />
      ))}
    </>
  );
};

export default WineListCardList;
