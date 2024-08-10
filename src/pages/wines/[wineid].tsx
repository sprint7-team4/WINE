import WineHero from "@/components/wineDetails/WineHero";
import ReviewCard from "@/components/wineDetails/ReviewCard";
import StarRatingSection from "@/components/wineDetails/StarRatingSection";
import { getWineId } from "@/lib/reviewApi";
import { WineReview } from "@/types/wineTypes";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import {
  useFormType,
  useReviewRerenderStore,
  useWineStore,
} from "@/store/reviewStore";
import ReviewModal from "@/components/wineDetails/ReviewModal";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const wineId = context.params?.wineid;

  if (!wineId || typeof wineId !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const res = await getWineId(wineId);

    return {
      props: {
        wine: res,
      },
    };
  } catch (error) {
    console.error("Error fetching wine data:", error);
    return {
      notFound: true,
    };
  }
};

const WineDetailPage = ({ wine }: { wine: WineReview }) => {
  const [currentWine, setCurrentWine] = useState<WineReview | null>(null);
  const setWine = useWineStore((state) => state.setWine);
  const { isReviewRerendered, setReviewRerendered } = useReviewRerenderStore(
    (state) => ({
      isReviewRerendered: state.isReviewRerendered,
      setReviewRerendered: state.setReviewRerendered,
    })
  );

  const { formType } = useFormType((state) => ({
    formType: state.formType,
    setFormType: state.setFormType,
  }));

  useEffect(() => {
    setWine(wine);
    setCurrentWine(wine);
  }, [wine, setWine]);

  useEffect(() => {
    if (isReviewRerendered) {
      const fetchWine = async () => {
        try {
          const res = await getWineId(String(wine.id));
          setCurrentWine(res);
          setReviewRerendered(false);
        } catch (error) {
          console.error("Error fetching wine data:", error);
        }
      };

      fetchWine();
    }
  }, [isReviewRerendered, wine.id, setReviewRerendered]);

  if (!currentWine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-1140 mx-auto pt-[20px]">
      <WineHero wine={currentWine} />
      <div className="flex flex-col mt-60">
        <h2 className="font-bold-20 max-lg:hidden">리뷰 목록</h2>
        <div className="flex flex-col lg:flex-row gap-20 md:gap-36 lg:gap-60">
          <div className="order-2 lg:order-none flex flex-col gap-16 md:gap-24 lg:gap-20 mt-0 lg:mt-22">
            {currentWine.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="flex-shrink-0 order-1 lg:order-none">
            <StarRatingSection wine={currentWine} />
          </div>
        </div>
      </div>
      {formType && <ReviewModal mode={formType} />}
    </div>
  );
};

export default WineDetailPage;
