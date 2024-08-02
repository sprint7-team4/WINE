import { FC, useState } from "react";
import { getWines } from "@/lib/wineApi";
import StarRating from "@/components/StarRating";
import BestWineList from "@/components/BestWineList";
import TopFiltering from "@/components/TopFiltering";
import SideFiltering from "@/components/SideFiltering";

const WineListPage: React.FC = () => {
  const [wineList, setWineList] = useState([]);

  return (
    <>
      <div className="pt-30">
        <div className="max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
          <p className="text-grayscale-800 text-16 font-bold mb-30">
            이번 달 추천 와인
          </p>
          <BestWineList />
        </div>
        <TopFiltering />
        <SideFiltering />
      </div>
    </>
  );
};

export default WineListPage;
