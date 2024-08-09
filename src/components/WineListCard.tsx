import wine1 from "@/assets/img/wine1.png";
import right from "@/assets/img/right.svg";
import Image from "next/image";
import StarRating from "./StarRating";
import { useState } from "react";
import { Wine } from "@/types/wineTypes";

const WineListCard = () => {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const fetchWineList = async () => {};

  return (
    <>
      <div className="w-800 h-375 rounded-16 border border-grayscale-300 flex-col">
        <div className="flex items-end h-248 border-b">
          <Image
            className="w-60 h-208 ml-60 mr-81"
            src={wine1}
            alt="wine이미지"
          />
          <div className="w-549 h-218 flex justify-between">
            <div className="flex flex-col w-300 h-208 justify-between">
              <p className="text-32 text-grayscale-80 font-semibold">
                Sentinel Carbernet Sauvignon 2016
              </p>
              <p className="text-16 text-grayscale-500 font-normal leading-2">
                Western Cape, South Africa
              </p>
              <div className="border rounded-12 bg-main-10 w-114 h-42 flex-center mb-14">
                <p className="text-18 text-main font-semibold">
                  &#8361; 64,990
                </p>
              </div>
            </div>

            <div className="w-120 h-208">
              <p className="text-55 font-extrabold mb-10">4.8</p>
              <StarRating rating={4.8} size={24} />
              <p className="text-16 text-grayscale-500 font-normal leading-6 mt-20">
                47개의 후기
              </p>
              <div className="flex justify-between">
                <span></span>
                <Image
                  className="cursor-pointer mt-25 w-36 h-36"
                  src={right}
                  alt="right arrow"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-680 h-128 ml-60 mt-19 mb-19">
          <p className="font-semibold text-16 text-grayscale-800 mb-10">
            최신 후기
          </p>
          <p className="text-16 text-grayscale-500 font-normal">
            Cherry, cocoa, vanilla and clove - beautiful red fruit driven
            Amarone. Low acidity and medium tannins. Nice long velvety finish.
          </p>
        </div>
      </div>
    </>
  );
};

export default WineListCard;
