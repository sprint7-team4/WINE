import { GetWinesParams, Wine } from "@/types/wineTypes";
import { useState } from "react";
import { getWines } from "@/lib/wineApi";
import WineListCard from "./WineListCard";

const WineListCardList = () => {
  const params: GetWinesParams = {
    limit: 10,
  };

  const [filteredWineList, setFilteredWineList] = useState<Wine[]>([]);

  const fetchWineData = async () => {
    const { list } = await getWines(params);
  };

  return (
    <>
      {/* {filteredWineList.map((wine) => (
        <WineListCard />
      ))} */}
    </>
  );
};

export default WineListCardList;
