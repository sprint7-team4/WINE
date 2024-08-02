import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Slider from "react-input-slider";
import { PriceSlider } from "./PriceSlider";

const sliderStyles = {
  track: {
    width: "284px",
    height: "6px",
    backgroundColor: "#ddd", // 트랙의 기본 배경색
  },
  active: {
    backgroundColor: "#6A42DB", // 활성화된 트랙의 배경색
  },
  thumb: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ffffff", // 썸의 기본 배경색
    borderRadius: "50%",
  },
};

function SliderComponent({ axis, xmax, xmin, xstep, onChange, value }: any) {
  const handleChange = (value: any) => {
    console.log("Slider value:", typeof value); // 슬라이더의 값 로그 찍기
    onChange(value);
  };

  return (
    <div>
      <Slider
        axis={axis}
        x={value}
        xmax={xmax}
        xmin={xmin}
        xstep={xstep}
        onChange={({ x }) => handleChange(x)}
        styles={sliderStyles}
      />
    </div>
  );
}

const SideFiltering = () => {
  const wineTypes = ["Red", "White", "Sparkling"];
  const [selectedWineType, setSelectedWineType] = useState("");

  const handleWineTypes = (type: string) => {
    setSelectedWineType(type);
  };
  const { handleSubmit, control } = useForm();
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
          <Controller
            control={control}
            name="test"
            defaultValue={50}
            render={({ field: { value, onChange } }) => (
              <SliderComponent
                className="bg-main text-red-400"
                axis={"x"}
                xmax={100000}
                xmin={0}
                xstep={1000}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <PriceSlider />

        <div className="mt-60">
          <p className="text-20 text-gray-800 font-bold mb-12">RATING</p>
        </div>
      </div>
    </div>
  );
};

export default SideFiltering;
