import Image from "next/image";
import { balancedProfiles } from "@/constants/review";
import Slider from "../Slider/Slider";
import ReviewTag from "./ReviewTag";
import defaultUserImg from "@/assets/img/profile-default.svg";
import favoriteImg from "@/assets/img/like.svg";
import menuImg from "@/assets/img/3dot-large.svg";
import moreImg from "@/assets/img/more.svg";
import { Review } from "@/types/wineTypes";
import { getElapsedTime } from "@/utils/wineDetailUtils";
import { AROMA_TO_KR } from "@/constants/aroma";

const ReviewCard = ({
  review: {
    user: { nickname, image },
    createdAt,
    content,
    aroma,
    rating,
  },
}: {
  review: Review;
}) => {
  const userImage = image || defaultUserImg;

  return (
    <section className="max-lg:w-full max-w-800 p-[16px_20px] md:p-[32px_40px_24px] lg:p-[16.5px_40px_20px] rounded-16 border border-grayscale-300 border-solid">
      <div className="flex justify-between mb-16 md:mb-20">
        <div className="flex gap-16 items-center">
          <Image
            src={userImage}
            alt="유저 프로필"
            width={64}
            height={64}
            className="w-42 h-42 md:w-64 md:h-64"
          />
          <div className="flex flex-col gap-0 md:gap-4">
            <span className="font-semibold-16 md:font-semibold-18 text-grayscale-800">
              {nickname}
            </span>
            <span className="font-regular-14 md:font-regular-16 text-grayscale-500">
              {getElapsedTime(createdAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-18 md:gap-24">
          <Image
            src={favoriteImg}
            alt="즐겨찾기"
            width={38}
            height={38}
            className="w-32 h-32 md:w-38 md:h-38"
          />
          <Image
            src={menuImg}
            alt="메뉴"
            width={38}
            height={38}
            className="w-32 h-32 md:w-38 md:h-38"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4 md:gap-10">
          {aroma.map((tag, index) => (
            <ReviewTag key={index} tag={AROMA_TO_KR[tag]} />
          ))}
        </div>
        <div className="w-60 h-36 md:w-80 md:h-42 flex flex-center gap-3 p-[8px_10px} md:p-[8px_15px} bg-main-10 rounded-12">
          <div className="fas fa-star text-main w-16 h-16 md:w-20 md:h-20 flex flex-center"></div>
          <span className="font-bold-14 md:font-bold-18 text-main flex items-center">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="mt-16 md:mt-24 mb-16 md:mb-20 font-regular-14 md:font-regular-16 ">
        {content}
      </p>
      <div className="flex flex-col gap-15 md:gap-18">
        {balancedProfiles.map((profile) => (
          <Slider key={profile.name} profile={profile} />
        ))}
      </div>
      <div className="flex flex-center mt-16 md:mt-24">
        <Image
          className="rotate-180"
          src={moreImg}
          alt="확장/축소"
          width={30}
          height={30}
        />
      </div>
    </section>
  );
};

export default ReviewCard;
