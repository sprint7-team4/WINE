import { FC } from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { useDeviceTypeDetector } from "@/hooks/useDeviceTypeDetector";
import DesktopPage from "@/components/ListPageDeviceType/DeskPage";
import TabletPage from "@/components/ListPageDeviceType/TabletPage";
import MobilePage from "@/components/ListPageDeviceType/MobilePage";

const WineListPage: FC = () => {
  const { isMobile, isTablet, isDesktop } = useLayoutStore();
  useDeviceTypeDetector(); // 디바이스 타입 감지 및 업데이트

  return (
    <>
      {isDesktop && <DesktopPage />}
      {isTablet && <TabletPage />}
      {isMobile && <MobilePage />}
    </>
  );
};

export default WineListPage;
