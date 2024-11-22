import { useWineStore } from "@/store/filteringStore";
import { useLayoutStore } from "@/store/layoutStore";
import { useEffect } from "react";
import WineListCard from "./WineListCard";
import MobileWineListCard from "@/components/wineListPage/MobileWineCard";
import { useWineFilter } from "@/hooks/useWineFilter";
import { useWineRerenderStore } from "@/store/wineStore";
import InfiniteScroll from "react-infinite-scroll-component";

const WineListCardList = () => {
  const { fetchWines, filteredWines, setFilteredWines } = useWineFilter();

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
      window.scrollTo(0, 0);
    };
    if (isWineRerendered) {
      setWineRerendered(false);
    }
    setFilteredWines([]);
    loadWines();
  }, [
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
      <InfiniteScroll
        dataLength={filteredWines.length}
        next={() => fetchWines(nextCursor)}
        hasMore={!!nextCursor}
        loader={<div className="text-center py-4">Loading...</div>}
        endMessage={
          <div className="text-center py-4 text-gray-500">
            {filteredWines.length > 0
              ? "모든 와인을 불러왔습니다."
              : "검색 결과가 없습니다."}
          </div>
        }
      >
        {filteredWines.map((wine) =>
          isMobile ? (
            <MobileWineListCard key={wine.id} wine={wine} />
          ) : (
            <WineListCard key={wine.id} wine={wine} />
          )
        )}
      </InfiniteScroll>
    </>
  );
};

export default WineListCardList;
