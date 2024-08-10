import { FC, useEffect } from "react";
import BestWineList from "@/components/BestWineList";
import TopFiltering from "@/components/TopFiltering";
import SideFiltering from "@/components/SideFiltering";
import WineListCard from "@/components/WineListCard";
import { useWineFilter } from "@/hooks/useWineFilter";
import { useWineStore } from "@/store/filteringStore";
import WineListCardList from "@/components/WineListCardList";
import WineRegistrationModal from "@/components/WineRegistrationModal";

const WineListPage: FC = () => {
  // const { fetchWines, filteredWines } = useWineFilter();
  // const { wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy } =
  //   useWineStore();

  // useEffect(() => {
  //   const loadWines = async () => {
  //     await fetchWines();
  //   };

  //   loadWines();
  // }, [wineType, minPrice, maxPrice, ratingRange, searchTerm, sortBy]);

  return (
    <>
      <div className="pt-30">
        <div className="relative max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
          <div className="flex-center absolute inset-0 rounded-20 w-100 h-300 bg-main">
            <p className="text-24 font-bold text-yellow-100">Best</p>
          </div>
          <p className="text-grayscale-800 text-16 font-bold mb-30 flex justify-center">
            이번 달 추천 와인
          </p>
          <BestWineList />
        </div>
        <TopFiltering />
        <div className="mt-62 w-full flex justify-between">
          <SideFiltering />
          <div>
            <WineListCardList />
            {/* {filteredWines && filteredWines.length > 0 ? (
              filteredWines.map((wine) => (
                <WineListCard key={wine.id} wine={wine} />
              ))
            ) : (
              <p>No wines found</p>
            )} */}
          </div>
        </div>
      </div>
      <WineRegistrationModal />
    </>
  );
};

export default WineListPage;
