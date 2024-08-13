import WineHero from "@/components/wineDetails/WineHero";
import ReviewCard from "@/components/wineDetails/ReviewCard";
import StarRatingSection from "@/components/wineDetails/StarRatingSection";
import { getWineId } from "@/lib/reviewApi";
import { Review, WineReview } from "@/types/wineTypes";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import {
  useFormType,
  useReviewRerenderStore,
  useWineDataStore,
} from "@/store/reviewStore";
import ReviewModal from "@/components/wineDetails/ReviewModal";
import NoReview from "@/components/wineDetails/NoReview";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const { wineData, setWine } = useWineDataStore((state) => ({
    setWine: state.setWineData,
    wineData: state.wineData,
  }));

  const { isReviewRerendered, setReviewRerendered } = useReviewRerenderStore(
    (state) => ({
      isReviewRerendered: state.isReviewRerendered,
      setReviewRerendered: state.setReviewRerendered,
    })
  );

  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const reviewsPerPage = 5;
  const { formType } = useFormType((state) => ({
    formType: state.formType,
    setFormType: state.setFormType,
  }));

  useEffect(() => {
    setWine(wine);
    setAllReviews(wine.reviews);
    setVisibleReviews(wine.reviews.slice(0, reviewsPerPage));
  }, [wine, setWine]);

  useEffect(() => {
    if (isReviewRerendered && wineData) {
      setAllReviews(wineData.reviews);
      setVisibleReviews(wineData.reviews.slice(0, reviewsPerPage));
      setPage(1);
      setHasMore(true);
      setReviewRerendered(false);
    }
  }, [isReviewRerendered, wineData?.reviews, setReviewRerendered, wineData]);

  const fetchMoreReviews = () => {
    const nextPage = page + 1;
    const newVisibleReviews = allReviews.slice(0, nextPage * reviewsPerPage);
    setVisibleReviews(newVisibleReviews);
    setPage(nextPage);
    if (newVisibleReviews.length >= allReviews.length) {
      setHasMore(false);
    }
  };

  if (!wineData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-1140 mx-auto pt-[20px] mb-100">
      <WineHero wine={wineData} />
      <div className="flex flex-col mt-60">
        <h2 className="font-bold-20 text-grayscale-800 max-lg:hidden">
          리뷰 목록
        </h2>
        {visibleReviews.length > 0 ? (
          <InfiniteScroll
            dataLength={visibleReviews.length}
            next={fetchMoreReviews}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>마지막 리뷰입니다.</p>}
          >
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="flex flex-col gap-16">
                {visibleReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              <StarRatingSection wine={wineData} />
            </div>
          </InfiniteScroll>
        ) : (
          <NoReview />
        )}
      </div>
      {formType && <ReviewModal mode={formType} />}
    </div>
  );
};

export default WineDetailPage;
