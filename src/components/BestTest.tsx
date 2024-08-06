import { getRecommendedWines, getWines } from "@/lib/wineApi";
import StarRating from "./StarRating";
import { GetWinesParams, Wine } from "@/types/wineTypes";
import { useEffect, useState } from "react";

const BestWineList = () => {
  const [wineList, setWineList] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const params: GetWinesParams = {
    limit: 10,
  };

  //   const dummyData: Wine[] = [
  //     {
  //       id: 5,
  //       name: "보르뇨 와인 보르뇨 qwrqwe lasidfsdnleew",
  //       image: "@/assets/img/wine1.png",
  //       price: 10000,
  //       region: "seoul",
  //       avgRating: 3.4,
  //       reviewCount: 5,
  //       userId: 5,
  //     },
  //   ];

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

  return (
    <div className="flex w-full">
      {loading ? (
        <p> !! 로딩중 !!</p>
      ) : (
        <>
          {wineList.length > 0 ? (
            wineList.map((wine) => (
              <div
                key={wine.id}
                className="w-232 h-185 rounded-16 bg-white flex items-end mr-15"
              >
                <div className="w-172 h-161 mx-auto bg-red flex justify-between">
                  <div className="w-44 h-161 bg-white">
                    {/* <img
                      src={wine.image}
                      alt={wine.name}
                      className="w-full h-full object-cover"
                    /> */}
                    이미지 불러오기이이이
                  </div>
                  <div className="w-100 h-125 bg-beige">
                    <p className="text-36 font-extrabold mb-5">
                      {wine.avgRating}
                    </p>
                    <StarRating rating={wine.avgRating} />
                    <p className="mt-5 leading-18 text-12 text-gray-500 font-normal">
                      {wine.name}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No wines available</p>
          )}
        </>
      )}
    </div>
  );
};

export default BestWineList;
