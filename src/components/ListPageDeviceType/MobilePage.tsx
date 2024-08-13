import { FC, ChangeEvent } from "react";
import BestWineList from "@/components/wineListPage/BestWineList";
import WineListCardList from "@/components/wineListPage/WineListCardList";
import { searchIcon, filter } from "@/assets/img/index";
import Image from "next/image";
import { useWineStore } from "@/store/filteringStore";
import WineFilterModal from "../wineListPage/WineFilterModal";
import useModalSecondStore from "@/store/modalSecondStore";
import WineRegistrationModal from "../wineListPage/WineRegistrationModal";

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

const MobilePage: FC = () => {
  const { searchTerm, setSearchTerm, sortBy, setSortBy } = useWineStore();
  const { openSecondModal } = useModalSecondStore();

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
      <div className="relative max-w-767 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
        <p className="text-grayscale-800 text-16 font-bold mb-30 flex justify-center">
          이번 달 추천 와인
        </p>
        <BestWineList />
      </div>
      <div className="max-w-767 h-38 mt-20 mb-20">
        <div className="relative">
          <Image
            className="absolute inset-y-11 left-21"
            src={searchIcon}
            alt="SearchIcon"
          />
          <input
            className="w-full h-38 border border-grayscale-300 focus:outline-main rounded-50 pl-51 mr-102"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="검색어를 입력해주세요"
          />
        </div>
      </div>
      <div className="max-w-767 h-38 mt-20 flex justify-between">
        <button
          className="w-38 h-38 flex-center rounded-8 border border-grayscale-300"
          onClick={() => openSecondModal("filter")}
        >
          <Image width={22} height={22} src={filter} alt="filterIcon" />
        </button>

        <div className="w-240 h-38 flex justify-between">
          {filterList.map((filterName) => (
            <span
              className={`cursor-pointer h-48 text-12 font-medium flex items-center ${sortBy === filterName.value ? "text-main" : "text-grayscale-500"}`}
              key={filterName.value}
              onClick={() => handleSelectFiltering(filterName.value)}
            >
              {filterName.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-50 max-w-767 mx-auto">
        <div>
          <WineListCardList />
        </div>
      </div>
      <WineFilterModal id={"filter"} />
      <WineRegistrationModal />
      <div className="h-75 fixed bottom-30 left-0 right-0 mx-4 p-20 rounded-16 bg-transport bg-opacity-80 shadow-lg">
        <button
          className="w-full cursor-pointer h-48 rounded-16 bg-main text-16 text-white font-bold
       transition duration-300 ease-in-out transform hover:scale-105 hover:brightness-110"
          onClick={() => openSecondModal("register")}
        >
          와인 등록하기
        </button>
      </div>
    </div>
  );
};

export default MobilePage;
