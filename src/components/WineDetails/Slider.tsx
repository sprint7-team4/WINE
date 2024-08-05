import { useState, useEffect, useRef } from "react";
import { BalancedProfile } from "@/types/reviewTypes";

const MAX_SCALE = 100;

const Slider = ({
  profile,
  mode = "review",
}: {
  profile: BalancedProfile;
  mode: string;
}) => {
  const { name, minimumText, maximumText, scale } = profile;
  const [value, setValue] = useState<number>(scale);

  const modeTest = "modal";

  const containerClass = modeTest === "modal" ? "w-260" : "w-491";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(scale);
  }, [scale]);

  return (
    <div className="flex gap-16 items-center justify-start">
      <span
        className="w-48 md:w-56 flex-shrink-0 font-semibold-12 ms: 
      font-semibold-14 text-grayscale-500 p-[5px_8px] 
      md:p-[4px_8px] rounded-6 bg-grayscale-100 flex-center"
      >
        {name}
      </span>
      <div className="flex flex-grow items-center">
        <h3 className="w-70 font-medium-14 md:font-medium-16 grayscale-800 whitespace-nowrap flex-shrink-0">
          {minimumText}
        </h3>
        <input
          className={`w-full ${containerClass} border border-gray-300 transition-opacity duration-150 ease-in-out mx-[15.5px]`}
          id="taste-slider"
          type="range"
          min="0"
          max={MAX_SCALE}
          value={value}
          onChange={handleChange}
        />
        <h3 className="w-56 text-right font-medium-14 md:font-medium-16 grayscale-800 whitespace-nowrap flex-shrink-0">
          {maximumText}
        </h3>
      </div>
    </div>
  );
};

export default Slider;
