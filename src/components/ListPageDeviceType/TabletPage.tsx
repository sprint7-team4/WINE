import { ChangeEvent, FC } from "react";
import BestWineList from "@/components/wineListPage/BestWineList";
import WineListCardList from "@/components/wineListPage/WineListCardList";
import WineRegistrationModal from "@/components/wineListPage/WineRegistrationModal";
import { useWineStore } from "@/store/filteringStore";
import Image from "next/image";
import { searchIcon, filter } from "@/assets/img/index";
import useModalStore from "@/store/modalStore";

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
  const { openModal } = useModalStore();

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
        <button className="w-48 h-48 flex-center rounded-8 border border-grayscale-300">
          <Image width={26} height={26} src={filter} alt="filterIcon" />
        </button>

        <button
          className="cursor-pointer w-220 h-48 rounded-16 bg-main text-16 text-white font-bold backdrop-blur-sm
             transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:brightness-110"
          onClick={openModal}
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
            <span
              className={`cursor-pointer h-48 text-16 font-medium flex items-center ${sortBy === filterName.value ? "text-main" : "text-grayscale-500"}`}
              key={filterName.value}
              onClick={() => handleSelectFiltering(filterName.value)}
            >
              {filterName.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-62 w-full flex justify-between">
        <div className="mx-auto">
          <WineListCardList />
        </div>
      </div>
      <WineRegistrationModal />
    </div>
  );
};

export default TabletPage;
