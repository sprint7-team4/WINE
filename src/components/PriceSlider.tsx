import { useWineStore } from "@/store/filteringStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Slider from "react-input-slider";

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

function SliderComponent({ axis, xmax, xmin, xstep, value, onChange }: any) {
  const { setPriceRange } = useWineStore();
  const [showValue, setShowValue] = useState("0");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setPriceRange?.([0, debouncedValue]);
  }, [debouncedValue, setPriceRange]);

  const handleChange = (value: number) => {
    setShowValue(value.toLocaleString("ko-KR", { maximumFractionDigits: 4 }));
    onChange(value);
  };

  return (
    <div>
      <div className="w-284 h-26 flex justify-between mt-20">
        <span className="text-16 text-main font-medium">&#8361; 0</span>
        <span className="text-16 text-main font-medium">
          &#8361; {showValue}
        </span>
      </div>
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

export const PriceSlider = () => {
  const { control } = useForm();

  return (
    <>
      <Controller
        control={control}
        name="test"
        defaultValue={50}
        render={({ field: { value, onChange } }) => (
          <SliderComponent
            axis={"x"}
            xmax={100000}
            xmin={0}
            xstep={1000}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};
