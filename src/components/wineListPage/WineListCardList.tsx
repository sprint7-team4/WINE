import { useWineStore } from "@/store/filteringStore";
import { useLayoutStore } from "@/store/layoutStore";
import { useEffect } from "react";
import WineListCard from "./WineListCard";
import MobileWineListCard from "@/components/wineListPage/MobileWineCard";
import { useWineFilter } from "@/hooks/useWineFilter";

const WineListCardList = () => {
  const { fetchWines, filteredWines } = useWineFilter();
  const { wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy } =
    useWineStore();
  const { isMobile } = useLayoutStore();

  useEffect(() => {
    const loadWines = async () => {
      await fetchWines();
    };

    loadWines();
  }, [
    wineType,
    minPrice,
    maxPrice,
    ratingRange,
    searchTerm,
    sortBy,
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
