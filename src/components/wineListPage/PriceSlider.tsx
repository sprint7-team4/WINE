import { useWineStore } from "@/store/filteringStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Slider from "react-input-slider";

const sliderStyles = {
  track: {
    width: "284px",
    height: "6px",
    backgroundColor: "#ddd",
  },
  active: {
    backgroundColor: "#6A42DB",
  },
  thumb: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
  },
};

function SliderComponent({ axis, xmax, xmin, xstep, value, onChange }: any) {
  const { setMaxPrice } = useWineStore();
  const [showValue, setShowValue] = useState("1,000,000");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setMaxPrice(debouncedValue);
  }, [debouncedValue, setMaxPrice]);

  const handleChange = (value: number) => {
    setShowValue(value.toLocaleString("ko-KR", { maximumFractionDigits: 4 }));
    onChange(value);
  };

  return (
    <div>
      <div className="w-284 h-26 flex justify-between mt-20">
        <span className="text-16 text-main font-medium">
          &#8361; {xmin.toLocaleString()}
        </span>
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
  const { minPrice } = useWineStore();
  const { control } = useForm();

  return (
    <>
      <Controller
        control={control}
        name="maxPrice"
        defaultValue={1000000}
        render={({ field: { value, onChange } }) => (
          <SliderComponent
            axis={"x"}
            xmax={1000000}
            xmin={minPrice}
            xstep={1000}
            value={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};
