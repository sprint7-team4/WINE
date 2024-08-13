import Image from "next/image";
import StarRating from "./StarRating";
import { Wine } from "@/types/wineTypes";
import wine1 from "@/assets/img/wine1.png";
import Link from "next/link";

interface WineListCardProps {
  wine: Wine;
}

const MobileWineListCard: React.FC<WineListCardProps> = ({ wine }) => {
  const {
    id,
    image,
    region,
    name,
    price,
    avgRating,
    reviewCount,
    recentReview,
  } = wine;

  return (
    <Link href={`/wines/${id}`}>
      <div
        key={id}
        className="max-w-800 h-400 mb-62 rounded-16 border border-grayscale-300 flex-col
      transition duration-300 ease-in-out 
      hover:shadow-xl hover:scale-[1.02] hover:border-main 
      cursor-pointer"
      >
        <div className="flex items-end h-250 border-b overflow-x-hidden">
          <Image
            className="w-60 h-250 ml-60 mr-81 object-cover"
            src={wine.image === "string" ? wine1 : wine.image}
            alt={`${name} 이미지`}
            width={60}
            height={208}
            quality={100}
          />
          <div className="w-549 h-218 flex flex-col justify-between">
            <div className="flex flex-col w-300 h-208 justify-between">
              <p className="text-17 text-grayscale-80 font-semibold leading-32">
                {name}
              </p>
              <p className="text-14 text-grayscale-500 font-normal leading-2">
                {region}
              </p>
              <div className="border rounded-12 bg-main-10 w-86 h-24 flex-center mb-8">
                <p className="text-14 text-main font-semibold">
                  &#8361; {price.toLocaleString()}
                </p>
              </div>
              <div className="w-200 h-40 flex mb-30">
                <p className="text-28 font-extrabold mb-10 mr-30">
                  {avgRating.toFixed(1)}
                </p>
                <div className="w-80 h-40">
                  <StarRating rating={avgRating} size={18} />
                  <p className="text-12 text-grayscale-500 font-normal leading-6 mt-10">
                    {reviewCount}개의 후기
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-680 h-128 ml-60 mt-19 mb-19">
          <p className="font-semibold text-14 text-grayscale-800 mb-8">
            최신 후기
          </p>
          {recentReview ? (
            <p className="text-16 text-grayscale-500 font-normal">
              {recentReview.content}
            </p>
          ) : (
            <p className="text-14 text-grayscale-400 font-normal">
              아직 리뷰가 없어요 ㅠ
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MobileWineListCard;
