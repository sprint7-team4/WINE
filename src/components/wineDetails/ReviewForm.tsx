import { BalancedProfile, ReviewFormProps } from "@/types/reviewTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import closeButton from "@/assets/img/close.svg";
import wineIcon from "@/assets/img/wineImg.svg";
import StarRating from "../StarRating";
import ProfileSliders from "./ProfileSliders";
import { balancedProfiles } from "@/constants/review";
import ReviewTag from "./ReviewTag";
import { AROMA_TO_KR } from "@/constants/aroma";

const ReviewForm = ({ mode, review, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [aroma, setAroma] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "edit" && review) {
      setRating(review.rating);
      setContent(review.content);
      setAroma(review.aroma);
    }
  }, [mode, review]);

  const newBalancedProfiles: Record<string, BalancedProfile> = {
    ...balancedProfiles,
  };

  const profilesArray = Object.values(newBalancedProfiles);

  return (
    <form className="flex flex-col justify-between max-w-528 h-1006 p-[24px_24px] text-grayscale-800">
      <div>
        <div className="flex justify-between mb-48">
          <h1 className="font-bold-32">
            {mode === "create" ? "리뷰 등록" : "수정하기"}
          </h1>
          <button onClick={onCancel}>
            <Image src={closeButton} alt="닫기 버튼" width={34} height={34} />
          </button>
        </div>
        <div className="flex items-center gap-16">
          <Image src={wineIcon} alt="와인 아이콘" width={68} height={68} />
          <div className="w-full flex flex-col gap-8 justify-between font-semibold-18">
            <h2>Sentinel Carbernet Sauvignon 2016</h2>
            <StarRating rating={4.5} />
          </div>
        </div>
        <div className="flex flex-col gap-40">
          <textarea
            className="mt-24 w-full h-120 p-[14px_20px] resize-none outline-none placeholder-font-medium-16 placeholder-grayscale-500 border border-gray-300 rounded-16"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="후기를 작성해 주세요"
          />
          <div className="flex flex-col gap-40">
            <div>
              <h3 className="font-bold-20 mb-24">와인의 맛은 어땠나요?</h3>
              <div className="flex flex-col gap-18">
                <ProfileSliders profilesArray={profilesArray} />
              </div>
            </div>
            <div>
              <h3 className="font-bold-20 mb-24">기억에 남는 향이 있나요?</h3>
              <div className="flex gap-4 md:gap-10 flex-wrap">
                {Object.entries(AROMA_TO_KR).map(([aroma, korean]) => (
                  <ReviewTag key={aroma} tag={korean} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="w-full font-bold-16 text-white p-[16px_36px] bg-main rounded-12">
          {mode === "create" ? "리뷰 남기기" : "수정하기"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;