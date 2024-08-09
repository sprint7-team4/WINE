import { useWineStore } from "@/store/filteringStore";
import { GetWinesParams, Wine } from "@/types/wineTypes";
import { useState, useEffect } from "react";
import { getWines } from "@/lib/wineApi";
import WineListCard from "./WineListCard";

const WineListCardList = () => {
  const { priceRange, wineType, ratingRange } = useWineStore();
  const [filteredWineList, setFilteredWineList] = useState<Wine[]>([]);

  const fetchWineData = async () => {
    const params: GetWinesParams = {
      limit: 10,
      priceMin: priceRange?.[0] || 0,
      priceMax: priceRange?.[1] || 100000,
      type: wineType,
      ratingMin: ratingRange?.[0] || 0,
      ratingMax: ratingRange?.[1] || 5,
    };

    const { list } = await getWines(params);
    setFilteredWineList(list);
  };

  useEffect(() => {
    fetchWineData();
  }, [priceRange, wineType, ratingRange]);

  return (
    <>
      {/* {filteredWineList.map((wine) => (
        <WineListCard key={wine.id} wine={wine} />
      ))} */}
    </>
  );
};

export default WineListCardList;
