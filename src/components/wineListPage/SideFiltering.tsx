import { useState } from "react";
import { PriceSlider } from "./PriceSlider";
import StarRatingFilter from "./StarRatingFilter";
import { useWineStore } from "@/store/filteringStore";
import useModalSecondStore from "@/store/ModalSecondStore";

type WineType = "RED" | "WHITE" | "SPARKLING" | null;
import useModalStore from "@/store/modalStore";

const SideFiltering = ({ hideButton = false }) => {
  const { openSecondModal } = useModalSecondStore();
  const wineTypes: WineType[] = ["RED", "WHITE", "SPARKLING"];
  const [selectedWineType, setSelectedWineType] = useState<WineType>(null);

  const { setWineType } = useWineStore();

  const handleWineTypes = (type: WineType) => {
    setSelectedWineType(type);
    setWineType(type);
  };

  return (
    <div className="w-284 h-628">
      <div>
        <p className="text-20 text-gray-800 font-bold mb-12">WINE TYPES</p>
        <div className="flex justify-between">
          {wineTypes.map((wineType) => (
            <button
              key={wineType}
              className={`cursor-pointer h-42 px-18 text-16 font-medium rounded-100 border ${selectedWineType === wineType ? "text-white bg-main" : "text-gray-800 border-grayscale-300"}`}
              onClick={() => handleWineTypes(wineType)}
            >
              {wineType}
            </button>
          ))}
        </div>

        <div className="mt-60">
          <p className="text-20 text-gray-800 font-bold mb-12">PRICE</p>
          <PriceSlider />
        </div>

        <div className="mt-60">
          <p className="text-20 text-gray-800 font-bold mb-12">RATING</p>
          <StarRatingFilter />
        </div>

        {!hideButton && (
          <button
            className="cursor-pointer mt-60 w-full h-50 rounded-16 bg-main text-16 text-white font-bold backdrop-blur-sm
              transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:brightness-110"
            onClick={() => openSecondModal("register")}
          >
            와인 등록하기
          </button>
        )}
      </div>
    </div>
  );
};

export default SideFiltering;
