import {
  ProfileScales,
  REVIEW_MODE,
  ReviewFields,
  ReviewFieldsEnum,
  ReviewFormProps,
  SendReview,
  WineBalanceEnum,
} from "@/types/reviewTypes";
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
  useWineDataStore,
} from "@/store/reviewStore";
import useModalStore from "@/store/modalStore";
import { showToast } from "../common/Toast";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

const INITIAL_RATING = 0;
const MAX_TAGS = 20;

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

const ReviewForm = ({ mode, wineId }: ReviewFormProps) => {
  const router = useRouter();
  const { wineid } = router.query;
  const isMyPage = router.pathname === "/myprofile";

  const [localBalancedProfiles, setLocalBalancedProfiles] = useState({
    ...balancedProfiles,
  });
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
    trigger,
  } = useForm<SendReview>({
    defaultValues:
      mode === REVIEW_MODE.CREATE ? INITIAL_REVIEW_DATA : INITIAL_REVIEW_DATA,
  });

  const wineData = useWineDataStore((state) => state.wineData);
  const setReviewSubmitted = useReviewRerenderStore(
    (state) => state.setReviewRerendered
  );
  const { closeModal } = useModalStore();
  const { setFormType } = useFormType((state) => ({
    setFormType: state.setFormType,
  }));
  const { reviewId, setReviewId } = useReviewStore((state) => ({
    reviewId: state.reviewId,
    setReviewId: state.setReviewId,
  }));
  const { setReviewCardRerendered } = useReviewRerenderStore((state) => ({
    setReviewCardRerendered: state.setReviewCardRerendered,
  }));
  const { setWine } = useWineDataStore((state) => ({
    setWine: state.setWine,
  }));
  const [selectedAroma, setSelectedAroma] = useState<EN_AROMAS[]>([]);

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
    setSelectedAroma([]);
    reset(INITIAL_REVIEW_DATA);
    setLocalBalancedProfiles({ ...balancedProfiles });
    setFormType(null);
    setReviewId(null);
    closeModal();
  };

  useEffect(() => {
    if (mode === REVIEW_MODE.EDIT && reviewId) {
      const fetchReviewData = async () => {
        try {
          const reviewDetails = await getReviewId(reviewId);
          Object.values(ReviewFieldsEnum).forEach((field) => {
            setValue(field, reviewDetails[field as keyof ReviewFields]);
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
      setValue("wineId", wineData.id);
    }
  }, [mode, wineData, reviewId, setValue]);

  const handleSliderValuesChange = (values: number[]) => {
    setLocalBalancedProfiles((prevProfiles) => {
      const updatedProfiles = { ...prevProfiles };

      Object.entries(updatedProfiles).forEach(([key, value], index) => {
        if (index < values.length && values[index] !== null) {
          updatedProfiles[key as keyof typeof updatedProfiles] = {
            ...value,
            scale: values[index],
          };
        }
      });

      Object.values(WineBalanceEnum).forEach((field) => {
        setValue(
          field,
          updatedProfiles[field as keyof ProfileScales].scale || 0
        );
      });

      return updatedProfiles;
    });
  };

  const handleTagClick = (tag: EN_AROMAS) => {
    setSelectedAroma((prev) => {
      const isTagSelected = prev.includes(tag);
      if (!isTagSelected && prev.length >= MAX_TAGS) {
        alert(`최대 ${MAX_TAGS}개의 태그만 선택할 수 있습니다.`);
        return prev;
      }

      const newSelection = isTagSelected
        ? prev.filter((item) => item !== tag)
        : [...prev, tag];

      setValue("aroma", newSelection);
      return newSelection;
    });
  };

  const onSubmit = async (data: SendReview) => {
    try {
      if (mode === REVIEW_MODE.CREATE) {
        await createReview(data);
        const res = await getWineId(String(wineid));
        setWine(res);
        if (res) showToast("리뷰 등록에 성공했습니다!", "success");
        setReviewSubmitted(true);
      } else if (mode === REVIEW_MODE.EDIT && reviewId) {
        await patchReview(reviewId, data);
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

  if (!wineData && !isMyPage) {
    return <div>Loading...</div>;
  }

  const validateRating = (value: number) => {
    if (value <= 0) {
      return "별점을 선택해 주세요";
    }
    return true;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between max-w-528 h-1006 p-[24px_24px] text-grayscale-800"
    >
      <div>
        <div className="flex justify-between mb-48">
          <h1 className="font-bold-32">
            {mode === REVIEW_MODE.CREATE ? "리뷰 등록" : "수정하기"}
          </h1>
          <button type="button" onClick={resetForm}>
            <Image src={closeButton} alt="닫기 버튼" width={34} height={34} />
          </button>
        </div>
        <div className="flex items-center gap-16">
          <Image src={wineIcon} alt="와인 아이콘" width={68} height={68} />
          <div className="w-full flex flex-col justify-between font-semibold-18">
            {!isMyPage && <h2 className="mb-8">{wineData?.name}</h2>}
            <Controller
              name="rating"
              control={control}
              rules={{ validate: validateRating }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <InteractiveStarRating
                    initialRating={field.value}
                    onRatingChange={(rating) => {
                      setValue("rating", rating, { shouldValidate: true });
                      trigger("rating");
                    }}
                  />
                  {errors.rating && (
                    <p className="text-red-500 mt-4 font-medium-16">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Controller
            name="content"
            control={control}
            rules={{ required: "후기를 작성해 주세요" }}
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  onBlur={async () => {
                    await trigger("content");
                  }}
                  className={`mt-24 w-full h-120 p-[14px_20px] resize-none outline-none 
                  placeholder-font-medium-16 placeholder-grayscale-500 rounded-16 
                  border-2 border-solid ${
                    errors.content
                      ? "border-red-500"
                      : "border-grayscale-300 focus:border-main"
                  }`}
                  placeholder="후기를 작성해 주세요"
                />
                {errors.content && (
                  <p className="text-red-500 mt-4 font-medium-16">
                    {errors.content.message}
                  </p>
                )}
              </>
            )}
          />
          <div className="flex flex-col gap-40 mt-40">
            <div>
              <h3 className="font-bold-20 mb-24">와인의 맛은 어땠나요?</h3>
              <div className="flex flex-col gap-18">
                <Controller
                  name="lightBold"
                  control={control}
                  render={({ field }) => (
                    <ProfileSliders
                      mode={mode}
                      profilesArray={Object.values(localBalancedProfiles)}
                      onSliderValuesChange={handleSliderValuesChange}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold-20 mb-24">기억에 남는 향이 있나요?</h3>
              <div className="flex flex-wrap gap-4 md:gap-10 ">
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
