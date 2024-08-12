import { FC } from "react";
import BestWineList from "@/components/wineListPage/BestWineList";
import TopFiltering from "@/components/wineListPage/TopFiltering";
import SideFiltering from "@/components/wineListPage/SideFiltering";
import WineListCardList from "@/components/wineListPage/WineListCardList";
import WineRegistrationModal from "@/components/wineListPage/WineRegistrationModal";

const DesktopPage: FC = () => {
  return (
    <div className="pt-30">
      <div className="relative max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
        <div className="flex-center absolute inset-0 rounded-20 w-100 h-300 bg-main">
          <p className="text-24 font-bold text-yellow-100">Best</p>
        </div>
        <p className="text-grayscale-800 text-16 font-bold mb-30 flex justify-center">
          이번 달 추천 와인
        </p>
        <BestWineList />
      </div>
      <TopFiltering />
      <div className="mt-62 w-full flex justify-between">
        <SideFiltering />
        <div>
          <WineListCardList />
        </div>
      </div>
      <WineRegistrationModal />
    </div>
  );
};

export default DesktopPage;
