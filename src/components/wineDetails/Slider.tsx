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
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipValue, setTooltipValue] = useState<number>(value);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const clamp = (val: number) => Math.max(0, Math.min(val, MAX_SCALE));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = clamp(Number(event.target.value));
    setValue(newValue);
    setTooltipValue(newValue);
  };

  useEffect(() => {
    const clampedValue = clamp(scale);
    setValue(clampedValue);
    setTooltipValue(clampedValue);
  }, [scale]);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const offsetX = event.clientX - left;
      const newValue = (offsetX / width) * MAX_SCALE;
      const clampedValue = Math.round(clamp(newValue));
      setTooltipValue(clampedValue);

      if (tooltipRef.current) {
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const newTooltipLeft = Math.min(
          Math.max(0, offsetX - tooltipWidth / 2),
          width - tooltipWidth
        );
        tooltipRef.current.style.left = `${newTooltipLeft + 10}px`;
      }
    }
  };

  return (
    <div className="relative flex gap-16 items-center justify-start">
      <span
        className="w-48 md:w-56 flex-shrink-0 font-semibold-12 ms: 
        font-semibold-14 text-grayscale-500 p-[5px_8px] 
        md:p-[4px_8px] rounded-6 bg-grayscale-100 flex-center"
      >
        {name}
      </span>
      <div className="relative flex flex-grow items-center">
        <h3 className="w-70 font-medium-14 md:font-medium-16 grayscale-800 whitespace-nowrap flex-shrink-0">
          {minimumText}
        </h3>
        <div className="relative w-full mx-[15.5px]">
          <input
            ref={sliderRef}
            className={`w-full border border-gray-300 transition-opacity duration-150 ease-in-out`}
            id="taste-slider"
            type="range"
            min="0"
            max={MAX_SCALE}
            value={value}
            onChange={handleChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          />
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute flex flex-center bg-gray-400 text-white text-xs rounded py-2 px-4"
              style={{
                bottom: "90%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {tooltipValue}
            </div>
          )}
        </div>
        <h3 className="w-56 text-right font-medium-14 md:font-medium-16 grayscale-800 whitespace-nowrap flex-shrink-0">
          {maximumText}
        </h3>
      </div>
    </div>
  );
};

export default Slider;
