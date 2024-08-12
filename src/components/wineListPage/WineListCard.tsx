import Image from "next/image";
import StarRating from "./StarRating";
import { Wine } from "@/types/wineTypes";
import wine1 from "@/assets/img/wine1.png";

interface WineListCardProps {
  wine: Wine;
}

const WineListCard: React.FC<WineListCardProps> = ({ wine }) => {
  const { image, region, name, price, avgRating, reviewCount, recentReview } =
    wine;

  return (
    <div
      className="w-800 h-375 mb-62 rounded-16 border border-grayscale-300 flex-col
                transition duration-300 ease-in-out 
                hover:shadow-xl hover:scale-[1.02] hover:border-main 
                cursor-pointer"
    >
      <div className="flex items-end h-248 border-b">
        <Image
          className="w-60 h-208 ml-60 mr-81 object-cover"
          src={wine.image === "string" ? wine1 : wine.image}
          alt={`${name} 이미지`}
          width={60}
          height={208}
        />
        <div className="w-549 h-218 flex justify-between">
          <div className="flex flex-col w-300 h-208 justify-between">
            <p className="text-28 text-grayscale-80 font-semibold">{name}</p>
            <p className="text-16 text-grayscale-500 font-normal leading-2 mb-10">
              {region}
            </p>
            <div className="border rounded-12 bg-main-10 w-114 h-42 flex-center mb-12">
              <p className="text-18 text-main font-semibold">
                &#8361; {price.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-120 h-208">
            <p className="text-55 font-extrabold mb-10">
              {avgRating.toFixed(1)}
            </p>
            <StarRating rating={avgRating} size={24} />
            <p className="text-16 text-grayscale-500 font-normal leading-6 mt-20">
              {reviewCount}개의 후기
            </p>
          </div>
        </div>
      </div>
      <div className="w-680 h-128 ml-60 mt-19 mb-19">
        <p className="font-semibold text-16 text-grayscale-800 mb-10">
          최신 후기
        </p>
        {recentReview ? (
          <p className="text-16 text-grayscale-500 font-normal">
            {recentReview.content}
          </p>
        ) : (
          <p className="text-16 text-grayscale-400 font-normal">
            아직 리뷰가 없어요 ㅠ
          </p>
        )}
      </div>
    </div>
  );
};

export default WineListCard;
