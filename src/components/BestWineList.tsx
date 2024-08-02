import { useEffect, useState, useRef } from "react";
import { getRecommendedWines } from "@/lib/wineApi";
import StarRating from "./StarRating";
import { GetWinesParams, Wine } from "@/types/wineTypes";

const BestWineList = () => {
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const params: GetWinesParams = {
    limit: 10,
  };

  const fetchBestWineList = async () => {
    setLoading(true);
    try {
      const recommendedWines = await getRecommendedWines(params);
      setWineList(recommendedWines);
    } catch (error) {
      setErrorMessage("추천 와인 목록을 불러오지 못했어요..");
      console.log("getRecommenedWines fetch 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestWineList();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRef.current.offsetLeft;

    if (x < width / 2) {
      setDirection("left");
    } else {
      setDirection("right");
    }
  };

  const handleMouseLeave = () => {
    setDirection(null);
  };

  const moveSlide = (dir: "left" | "right") => {
    setCurrentIndex((prevIndex) => {
      if (dir === "left") {
        return prevIndex === 0 ? wineList.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === wineList.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useEffect(() => {
    if (direction) {
      intervalRef.current = setInterval(() => moveSlide(direction), 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [direction]);

  return (
    <div
      className="relative w-full h-185 perspective-500 cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {loading ? (
        <p className="text-center">로딩중...</p>
      ) : (
        <>
          {wineList.length > 0 ? (
            <div className="flex items-center justify-center h-full">
              {wineList.map((wine, index) => {
                const offset =
                  (index - currentIndex + wineList.length) % wineList.length;
                const isVisible =
                  Math.abs(offset) <= 2 ||
                  Math.abs(offset - wineList.length) <= 2;
                return (
                  isVisible && (
                    <div
                      key={wine.id}
                      className={`absolute w-[232px] h-[185px] rounded-[16px] bg-white shadow-lg transition-all duration-300 ease-out ${
                        offset === 0
                          ? "z-10 scale-100 opacity-100"
                          : "scale-75 opacity-50"
                      }`}
                      style={{
                        transform: `
                        translateX(${(offset === wineList.length - 1 ? -1 : offset) * 120}%)
                        translateZ(${offset === 0 ? 0 : -100}px)
                        rotateY(${offset * 45}deg)
                      `,
                      }}
                    >
                      <div className="flex justify-between p-4">
                        <div className="w-[44px] h-[161px] bg-gray-200">
                          이미지 불러오기
                        </div>
                        <div className="w-[100px] h-[125px]">
                          <p className="text-3xl font-extrabold mb-10">
                            {wine.avgRating.toFixed(1)}
                          </p>
                          <StarRating rating={wine.avgRating} />
                          <p className="mt-2 text-xs text-gray-500 font-normal line-clamp-2 mt-10">
                            {wine.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          ) : (
            <p className="text-center">No wines available</p>
          )}
        </>
      )}
    </div>
  );
};

export default BestWineList;
