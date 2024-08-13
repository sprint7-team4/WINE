import { ChangeEvent, FC } from "react";
import BestWineList from "@/components/wineListPage/BestWineList";
import WineListCardList from "@/components/wineListPage/WineListCardList";
import WineRegistrationModal from "@/components/wineListPage/WineRegistrationModal";
import { useWineStore } from "@/store/filteringStore";
import Image from "next/image";
import { searchIcon, filter } from "@/assets/img/index";
import WineFilterModal from "../wineListPage/WineFilterModal";
import useModalSecondStore from "@/store/newModalStore";
import { useState } from "react";

type FilterValue =
  | "latest"
  | "recommended"
  | "mostReviews"
  | "priceHigh"
  | "priceLow";

interface FilterOption {
  value: FilterValue;
  label: string;
}

const TabletPage: FC = () => {
  const { searchTerm, setSearchTerm, sortBy, setSortBy } = useWineStore();
  const { openSecondModal } = useModalSecondStore();

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState<FilterValue | null>(null);

  const filterList: FilterOption[] = [
    { value: "recommended", label: "추천순" },
    { value: "mostReviews", label: "많은리뷰" },
    { value: "priceHigh", label: "높은가격순" },
    { value: "priceLow", label: "낮은가격순" },
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFiltering = (selected: FilterValue) => {
    setSortBy(selected);
  };

  return (
    <div className="pt-30">
      <div className="relative max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
        <p className="text-grayscale-800 text-16 font-bold mb-30 flex justify-center">
          이번 달 추천 와인
        </p>
        <BestWineList />
      </div>
      <div className="max-w-1140 h-48 mx-auto mb-40 mt-40 flex justify-between">
        <div className="relative">
          {/* 보라빛 배경 효과 */}
          <div
            className={`absolute inset-0 bg-main-10 rounded-lg transition-all duration-300 ${isHovered ? "scale-125" : "scale-0"}`}
          />

          {/* 메인 버튼 */}
          <button
            className="relative w-48 h-48 flex items-center justify-center rounded-lg border border-gray-300 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => openSecondModal("filter")}
          >
            {/* 회전 효과를 위한 배경 */}
            <div
              className={`absolute inset-0 bg-white transition-all duration-300 ${isHovered ? "rotate-45 scale-150" : ""}`}
            />

            {/* 아이콘 */}
            <Image
              width={26}
              height={26}
              src={filter}
              alt="filterIcon"
              className={`relative z-10 transition-all duration-300 ${isHovered ? "scale-110 filter drop-shadow" : ""}`}
            />

            {/* 텍스트 */}
            <span
              className={`absolute bottom-0 left-0 right-0 text-center text-xs text-purple-500 transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
              와인필터
            </span>
          </button>
        </div>

        <button
          className="cursor-pointer w-220 h-48 rounded-16 bg-main text-16 text-white font-bold backdrop-blur-sm
             transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:brightness-110"
          onClick={() => openSecondModal("register")}
        >
          와인 등록하기
        </button>
      </div>
      <div className="max-w-1024 h-48 mx-auto flex justify-between">
        <div className="relative">
          <Image
            className="absolute inset-y-11 left-21"
            src={searchIcon}
            alt="SearchIcon"
          />
          <input
            className="w-350 h-48 border border-grayscale-300 focus:outline-main rounded-50 pl-51 mr-102"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="검색어를 입력해주세요"
          />
        </div>
        <div className="w-298 h-48 flex justify-between">
          {filterList.map((filterName) => (
            <div
              key={filterName.value}
              className="relative"
              onMouseEnter={() => setHoveredFilter(filterName.value)}
              onMouseLeave={() => setHoveredFilter(null)}
            >
              {/* 보라빛 배경 효과 */}
              <div
                className={`absolute inset-0 h-30 bg-white rounded-lg transition-all duration-300 ${
                  hoveredFilter === filterName.value ||
                  sortBy === filterName.value
                    ? "opacity-100 scale-125"
                    : "opacity-0 scale-0"
                }`}
              />

              {/* 필터 텍스트 */}
              <span
                className={`cursor-pointer h-30 text-16 font-medium flex items-center justify-center relative z-10 px-3 rounded-lg transition-all duration-300 ${
                  sortBy === filterName.value
                    ? "text-main transform scale-110 shadow-md"
                    : hoveredFilter === filterName.value
                      ? "text-main"
                      : "text-grayscale-500"
                }`}
                onClick={() => handleSelectFiltering(filterName.value)}
              >
                {filterName.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-62 w-full flex justify-between">
        <div className="mx-auto">
          <WineListCardList />
        </div>
      </div>
      <WineFilterModal id={"filter"} />
      <WineRegistrationModal />
    </div>
  );
};

export default TabletPage;
