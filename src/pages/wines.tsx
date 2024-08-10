import { FC, useEffect, useState, useCallback } from "react";
import BestWineList from "@/components/BestWineList";
import TopFiltering from "@/components/TopFiltering";
import SideFiltering from "@/components/SideFiltering";
import WineListCardList from "@/components/WineListCardList";
import WineRegistrationModal from "@/components/WineRegistrationModal";
import { useLayoutStore } from "@/store/layoutStore";
import { useDebounce } from "@/hooks/useDebounce";

const WineListPage: FC = () => {
  const { setDeviceType, isMobile, isTablet, isDesktop } = useLayoutStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const debouncedWidth = useDebounce(windowWidth, 250);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (debouncedWidth < 768) {
      setDeviceType("mobile");
    } else if (debouncedWidth < 1024) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  }, [debouncedWidth, setDeviceType]);

  return (
    <>
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
      </div>
      <WineRegistrationModal />
    </>
  );
};

export default WineListPage;
