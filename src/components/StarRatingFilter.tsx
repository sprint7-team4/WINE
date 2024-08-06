import React from "react";
import { useStarRatingStore } from "@/store/starRatingStore";

interface FilterOption {
  value: string;
  label: string;
}

const StarRatingFiltering: React.FC = () => {
  const { ratingFilter, setRatingFilter } = useStarRatingStore();

  const filterOptions: FilterOption[] = [
    { value: "all", label: "전체" },
    { value: "4-5", label: "4.0 ~ 5.0" },
    { value: "3-4", label: "3.0 ~ 4.0" },
    { value: "2-3", label: "2.0 ~ 3.0" },
    { value: "1-2", label: "1.0 ~ 2.0" },
  ];

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingFilter(event.target.value);
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
            checked={ratingFilter === option.value}
            onChange={handleFilterChange}
            className="sr-only"
          />
          <span className="relative w-20 h-20 bg-grayscale-100 rounded-6 flex items-center justify-center group-hover:bg-gray-300">
            {ratingFilter === option.value && (
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
