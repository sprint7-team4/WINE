import { FC, useState } from "react";
import { getWines } from "@/lib/wineApi";
import StarRating from "@/components/StarRating";

const WineListPage: React.FC = () => {
  const [wineList, setWineList] = useState([]);

  return (
    <>
      <div className="max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 mt-20 pl-30 pt-30">
        <p className="text-grayscale-800 text-16 font-bold">
          이번 달 추천 와인
        </p>
        <StarRating rating={4.8} />

        <div></div>
        <div></div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-start">
            <i className="fas fa-star w-18 h-18 text-gray-300" />
            <i className="fas fa-star w-18 h-18 text-gray-300" />
            <i className="fas fa-star w-18 h-18 text-gray-300" />
            <i className="fas fa-star w-18 h-18 text-gray-300" />
            <i className="fas fa-star w-18 h-18 text-gray-300" />
          </div>

          <div className="relative flex items-center justify-start">
            <i className="fas fa-star w-18 h-18 text-yellow-500" />
            <i className="fas fa-star w-18 h-18 text-yellow-500" />
            <i className="fas fa-star w-9 overflow-hidden h-18 text-yellow-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WineListPage;
