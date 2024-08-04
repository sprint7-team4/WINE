import { useState } from "react";
import { PriceSlider } from "./PriceSlider";

const SideFiltering = () => {
  const wineTypes = ["Red", "White", "Sparkling"];
  const [selectedWineType, setSelectedWineType] = useState("");

  const handleWineTypes = (type: string) => {
    setSelectedWineType(type);
  };
  return (
    <div className="w-284 h-628">
      <div>
        <p className="text-20 text-gray-800 font-bold mb-12">WINE TYPES</p>
        <div className="flex justify-between">
          {wineTypes.map((wineType, index) => (
            <button
              key={index}
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
        </div>
      </div>
    </div>
  );
};

export default SideFiltering;