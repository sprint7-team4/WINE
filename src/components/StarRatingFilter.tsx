import React from "react";
import { useStarRatingStore } from "@/store/starRatingStore";
import { useWineStore } from "@/store/filteringStore";

interface FilterOption {
  value: number;
  label: string;
}

const StarRatingFiltering: React.FC = () => {
  const { ratingRange, setRatingRange } = useWineStore();

  const filterOptions: FilterOption[] = [
    { value: 0, label: "전체" },
    { value: 4, label: "4.0 ~ 5.0" },
    { value: 3, label: "3.0 ~ 4.0" },
    { value: 2, label: "2.0 ~ 3.0" },
    { value: 1, label: "1.0 ~ 2.0" },
  ];

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const numValue = parseInt(value, 10);
    console.log(numValue);

    if (numValue === 0) {
      setRatingRange([numValue, 5]);
      return;
    }
    setRatingRange([numValue, numValue + 1]);
  };

  return (
    <div className="mb-4 flex flex-wrap">
      {filterOptions.map((option) => (
        <label
          key={option.value}
          className="w-full mr-4 mb-2 flex items-center cursor-pointer group"
        >
          <input
            type="radio"
            value={option.value}
            checked={ratingRange[0] === option.value}
            onChange={handleFilterChange}
            className="sr-only"
          />
          <span className="relative w-20 h-20 bg-grayscale-100 rounded-6 flex items-center justify-center group-hover:bg-gray-300">
            {ratingRange[0] === option.value && (
              <span className="absolute w-10 h-10 bg-main rounded-3"></span>
            )}
          </span>
          <span className="ml-15 text-16 font-medium text-grayscale-800">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFiltering;
