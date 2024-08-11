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
import {
  createReview,
  getReviewId,
  getWineId,
  patchReview,
} from "@/lib/reviewApi";
import {
  useFormType,
  useReviewRerenderStore,
  useReviewStore,
  useWineStore,
} from "@/store/reviewStore";
import useModalStore from "@/store/modalStore";
import { showToast } from "../common/Toast";
import { useRouter } from "next/router";

const INITIAL_RATING = 0;

const INITIAL_REVIEW_DATA: SendReview = {
  rating: 0,
  aroma: [],
  lightBold: 0,
  smoothTannic: 0,
  drySweet: 0,
  softAcidic: 0,
  content: "",
  wineId: 0,
};

const ReviewForm = ({ mode }: ReviewFormProps) => {
  const router = useRouter();
  const { wineid } = router.query;
  const [localBalancedProfiles, setLocalBalancedProfiles] = useState({
    ...balancedProfiles,
  });
  const [selectedAroma, setSelectedAroma] = useState<EN_AROMAS[]>([]);
  const [reviewData, setReviewData] = useState(
    mode === REVIEW_MODE.CREATE ? INITIAL_REVIEW_DATA : null
  );
  const wineData = useWineStore((state) => state.wineData);
  const setReviewSubmitted = useReviewRerenderStore(
    (state) => state.setReviewRerendered
  );
  const { closeModal } = useModalStore();
  const { setFormType } = useFormType((state) => ({
    setFormType: state.setFormType,
  }));
  const { reviewId } = useReviewStore((state) => ({
    reviewId: state.reviewId,
  }));
  const { setReviewCardRerendered } = useReviewRerenderStore((state) => ({
    setReviewCardRerendered: state.setReviewCardRerendered,
  }));
  const { setWine } = useWineStore((state) => ({
    setWine: state.setWine,
  }));

  const updateLocalBalancedProfiles = (reviewDetails: SendReview) => {
    setLocalBalancedProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };
      Object.entries(updatedProfiles).forEach(([key, value]) => {
        if (key in reviewDetails) {
          updatedProfiles[key as keyof typeof updatedProfiles] = {
            ...value,
            scale: Number(reviewDetails[key as keyof SendReview]),
          };
        }
      });
      return updatedProfiles;
    });
  };

  const resetForm = () => {
    setReviewData({
      rating: INITIAL_RATING,
      aroma: [],
      lightBold: 0,
      smoothTannic: 0,
      drySweet: 0,
      softAcidic: 0,
      content: "",
      wineId: 0,
    });
    setSelectedAroma([]);
    setLocalBalancedProfiles({ ...balancedProfiles });

    setFormType(null);
    closeModal();
  };

  useEffect(() => {
    if (mode === REVIEW_MODE.EDIT && reviewId) {
      const fetchReviewData = async () => {
        try {
          const reviewDetails = await getReviewId(reviewId);
          setReviewData({
            ...reviewDetails,
            wineId: wineData?.id || 0,
          });
          setSelectedAroma(reviewDetails.aroma);
          updateLocalBalancedProfiles(reviewDetails);
        } catch (error) {
          console.error("Error fetching review details:", error);
          showToast("리뷰 데이터를 불러오는 데 실패했습니다.", "error");
        }
      };

      fetchReviewData();
    }

    if (mode === REVIEW_MODE.CREATE && wineData) {
      setReviewData((prevData) => ({
        ...(prevData as SendReview),
        wineId: wineData.id,
      }));
    }
  }, [mode, wineData, reviewId]);

  const handleSliderValuesChange = (values: number[]) => {
    setLocalBalancedProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };

      Object.entries(updatedProfiles).forEach(([key, value], index) => {
        if (index < values.length && values[index] !== null) {
          updatedProfiles[key as keyof typeof updatedProfiles] = {
            ...value,
            scale: values[index],
          };
        } else if (
          index < values.length &&
          updatedProfiles[key as keyof typeof updatedProfiles].scale === 0
        ) {
        }
      });

      setReviewData((prevData) => ({
        ...(prevData as SendReview),
        lightBold: updatedProfiles.lightBold.scale || 0,
        smoothTannic: updatedProfiles.smoothTannic.scale || 0,
        drySweet: updatedProfiles.drySweet.scale || 0,
        softAcidic: updatedProfiles.softAcidic.scale || 0,
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
        ...(prevData as SendReview),
        aroma: newSelection,
      }));

      return newSelection;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === REVIEW_MODE.CREATE && reviewData) {
        await createReview(reviewData);
        const res = await getWineId(String(wineid));
        setWine(res);
        if (res) showToast("리뷰 등록에 성공했습니다!", "success");
        setReviewSubmitted(true);
      } else if (mode === REVIEW_MODE.EDIT && reviewId && reviewData) {
        await patchReview(reviewId, reviewData);
        setReviewCardRerendered(true);
        showToast("리뷰 수정에 성공했습니다!", "success");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("유효한 로그인이 아닙니다. <br /> 로그인을 해주세요.", "error");
    } finally {
      resetForm();
    }
  };

  if (!wineData || !reviewData) {
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
          <button
            type="button"
            onClick={() => {
              resetForm();
            }}
          >
            <Image src={closeButton} alt="닫기 버튼" width={34} height={34} />
          </button>
        </div>
        <div className="flex items-center gap-16">
          <Image src={wineIcon} alt="와인 아이콘" width={68} height={68} />
          <div className="w-full flex flex-col gap-8 justify-between font-semibold-18">
            <h2>{wineData.name}</h2>
            <InteractiveStarRating
              initialRating={reviewData.rating}
              onRatingChange={(rating) =>
                setReviewData((prevData) => ({
                  ...(prevData as SendReview),
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
                ...(prevData as SendReview),
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
