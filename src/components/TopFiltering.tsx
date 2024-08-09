import { ChangeEvent, useState } from "react";
import React from "react";
import searchIcon from "@/assets/img/search.svg";
import Image from "next/image";

const TopFiltering = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiltering, setSelectedFiltering] = useState("");
  const filterList = ["리뷰순", "높은가격순", "낮은가격순", "추천순"];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFiltering = (selected: string) => {
    setSelectedFiltering(selected);
  };
  return (
    <div className="mt-40 w-1140 h-48 flex justify-end">
      <div className="relative">
        <Image
          className="absolute inset-y-11 left-21"
          src={searchIcon}
          alt="SearchIcon"
        />
        <input
          className="w-400 h-48 border border-grayscale-300 focus:outline-main rounded-50 pl-51 mr-102"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="검색어를 입력해주세요"
        />
      </div>
      <div className="w-298 h-48 flex justify-between">
        {filterList.map((filterName, index) => (
          <span
            className={`cursor-pointer h-48 text-16 font-medium flex items-center ${selectedFiltering === filterName ? "text-main" : "text-grayscale-500"}`}
            key={index}
            onClick={() => handleSelectFiltering(filterName)}
          >
            {filterName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopFiltering;
