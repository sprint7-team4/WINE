import { FC, useState, useEffect } from "react";
import BestWineList from "@/components/wineListPage/BestWineList";
import TopFiltering from "@/components/wineListPage/TopFiltering";
import SideFiltering from "@/components/wineListPage/SideFiltering";
import WineListCardList from "@/components/wineListPage/WineListCardList";
import WineRegistrationModal from "@/components/wineListPage/WineRegistrationModal";

const customStyles = `
  @font-face {
    src: url("https://www.axis-praxis.org/fonts/webfonts/MetaVariableDemo-Set.woff2") format("woff2");
    font-family: "Meta";
    font-style: normal;
    font-weight: normal;
  }

  .fancy-text {
    transition: all 0.5s;
    font-family: "Meta", sans-serif;
    font-size: 6rem;
    font-weight: bold;
    cursor: pointer;
  }

  .fancy-text.animated {
    -webkit-text-stroke: 2px #d6f4f4;
    font-variation-settings: "wght" 900, "ital" 1;
    color: transparent;
    text-shadow: 5px 5px 0px #07bccc,
                 8px 8px 0px #e601c0,
                 11px 11px 0px #e9019a,
                 14px 14px 0px #f40468,
                 20px 20px 5px #482896;
  }

  .fancy-text:not(.animated) {
    font-variation-settings: "wght" 100, "ital" 0;
    text-shadow: none;
    color: #d6f4f4;
  }
`;

const DesktopPage: FC = () => {
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimated((prev) => !prev);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pt-30">
      <div className="relative max-w-1140 h-300 mx-auto bg-grayscale-100 rounded-16 pl-30 pt-30">
        <style jsx>{customStyles}</style>
        <div className="flex-center absolute inset-0 rounded-20 w-120 h-300 bg-main">
          <p className={`fancy-text ${isAnimated ? "animated" : ""}`}>BEST</p>
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
