import { REVIEW_MODE, ReviewFormProps, SendReview } from "@/types/reviewTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import closeButton from "@/assets/img/close.svg";
import wineIcon from "@/assets/img/wineImg.svg";
import ProfileSliders from "./ProfileSliders";
import { balancedProfiles } from "@/constants/review";
import ReviewTag from "./ReviewTag";
import { AROMA_TO_KR, EN_AROMAS } from "@/constants/aroma";
import InteractiveStarRating from "./InteractiveStarRating";
import { createReview } from "@/lib/reviewApi";
import { useWineStore } from "@/store/reviewStore";

const INITIALRATING = 0;

const ReviewForm = ({ mode, review, onCancel }: ReviewFormProps) => {
  const [localBalancedProfiles, setLocalBalancedProfiles] = useState({
    ...balancedProfiles,
  });
  const [selectedAroma, setSelectedAroma] = useState<EN_AROMAS[]>([]);
  const [reviewData, setReviewData] = useState<SendReview>({
    rating: 0,
    aroma: [],
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
    content: "",
    wineId: 0,
  });
  const wineData = useWineStore((state) => state.wine);

  useEffect(() => {
    if (mode === REVIEW_MODE.EDIT && review) {
    }
    if (wineData) {
      setReviewData((prevData) => ({
        ...prevData,
        wineId: wineData.id,
      }));
    }
  }, [mode, review, wineData]);

  const handleSliderValuesChange = (values: number[]) => {
    setLocalBalancedProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };

      Object.entries(updatedProfiles).forEach(([key, value], index) => {
        if (index < values.length) {
          updatedProfiles[key as keyof typeof updatedProfiles] = {
            ...value,
            scale: values[index],
          };
        }
      });

      setReviewData((prevData) => ({
        ...prevData,
        lightBold: updatedProfiles.lightBold.scale,
        smoothTannic: updatedProfiles.smoothTannic.scale,
        drySweet: updatedProfiles.drySweet.scale,
        softAcidic: updatedProfiles.softAcidic.scale,
      }));

      return updatedProfiles;
    });
  };

  const handleTagClick = (tag: EN_AROMAS) => {
    setSelectedAroma((prev) => {
      const newSelection = prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag];

      setReviewData((prevData) => ({
        ...prevData,
        aroma: newSelection,
      }));

      return newSelection;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (mode === REVIEW_MODE.CREATE) {
        await createReview(reviewData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!wineData) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between max-w-528 h-1006 p-[24px_24px] text-grayscale-800"
    >
      <div>
        <div className="flex justify-between mb-48">
          <h1 className="font-bold-32">
            {mode === REVIEW_MODE.CREATE ? "리뷰 등록" : "수정하기"}
          </h1>
          <button onClick={onCancel}>
            <Image src={closeButton} alt="닫기 버튼" width={34} height={34} />
          </button>
        </div>
        <div className="flex items-center gap-16">
          <Image src={wineIcon} alt="와인 아이콘" width={68} height={68} />
          <div className="w-full flex flex-col gap-8 justify-between font-semibold-18">
            <h2>{wineData.name}</h2>
            <InteractiveStarRating
              initialRating={INITIALRATING}
              onRatingChange={(rating) =>
                setReviewData((prevData) => ({
                  ...prevData,
                  rating,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-40">
          <textarea
            className="mt-24 w-full h-120 p-[14px_20px] resize-none outline-none placeholder-font-medium-16 placeholder-grayscale-500 border border-gray-300 rounded-16"
            value={reviewData.content}
            onChange={(e) =>
              setReviewData((prevData) => ({
                ...prevData,
                content: e.target.value,
              }))
            }
            placeholder="후기를 작성해 주세요"
          />
          <div className="flex flex-col gap-40">
            <div>
              <h3 className="font-bold-20 mb-24">와인의 맛은 어땠나요?</h3>
              <div className="flex flex-col gap-18">
                <ProfileSliders
                  mode={mode}
                  profilesArray={Object.values(localBalancedProfiles)}
                  onSliderValuesChange={handleSliderValuesChange}
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold-20 mb-24">기억에 남는 향이 있나요?</h3>
              <div className="flex gap-4 md:gap-10 flex-wrap">
                {Object.entries(AROMA_TO_KR).map(([aroma, korean]) => (
                  <ReviewTag
                    mode={mode}
                    key={aroma}
                    tag={korean}
                    isSelected={selectedAroma.includes(aroma as EN_AROMAS)}
                    onClick={() => handleTagClick(aroma as EN_AROMAS)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="w-full font-bold-16 text-white p-[16px_36px] bg-main rounded-12">
          {mode === REVIEW_MODE.CREATE ? "리뷰 남기기" : "수정하기"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
