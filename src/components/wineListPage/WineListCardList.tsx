import { useWineStore } from "@/store/filteringStore";
import { useLayoutStore } from "@/store/layoutStore";
import { useEffect } from "react";
import WineListCard from "./WineListCard";
import MobileWineListCard from "@/components/wineListPage/MobileWineCard";
import { useWineFilter } from "@/hooks/useWineFilter";
import { useWineRerenderStore } from "@/store/wineStore";

const WineListCardList = () => {
  const { fetchWines, filteredWines } = useWineFilter();

  const {
    nextCursor,
    wineType,
    minPrice,
    maxPrice,
    ratingRange,
    searchTerm,
    sortBy,
  } = useWineStore();
  const { isWineRerendered, setWineRerendered } = useWineRerenderStore();
  const { isMobile } = useLayoutStore();

  useEffect(() => {
    const loadWines = async () => {
      await fetchWines();
    };
    if (isWineRerendered) {
      setWineRerendered(false);
    }
    loadWines();
  }, [
    nextCursor,
    wineType,
    minPrice,
    maxPrice,
    ratingRange,
    searchTerm,
    sortBy,
    isWineRerendered,
    fetchWines,
  ]);

  return (
    <>
      {filteredWines.map((wine) =>
        isMobile ? (
          <MobileWineListCard key={wine.id} wine={wine} />
        ) : (
          <WineListCard key={wine.id} wine={wine} />
        )
      )}
    </>
  );
};

export default WineListCardList;
