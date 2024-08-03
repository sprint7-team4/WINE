import WineHero from "@/components/WineDetails/WineHero";
import ReviewCard from "@/components/WineDetails/ReviewCard";
import StarRatingSection from "@/components/WineDetails/StarRatingSection";
import { getWineId } from "@/lib/wineApi";
import { Wine } from "@/types/wineTypes";
import { GetServerSideProps } from "next";

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

const WineDetailPage = ({ wine }: { wine: Wine }) => {
  if (!wine) {
    return;
  }

  return (
    <div className="max-w-1140 mx-auto pt-[20px]">
      <WineHero wine={wine} />
      <div className="flex flex-col mt-60">
        <h2 className="font-bold-20 max-lg:hidden">리뷰 목록</h2>
        <div className="flex flex-col lg:flex-row gap-20 md:gap-36 lg:gap-60">
          <div className="order-2 lg:order-none flex flex-col gap-16 md:gap-24 lg:gap-20 mt-0 lg:mt-22">
            {wine.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="flex-shrink-0 order-1 lg:order-none">
            <StarRatingSection wine={wine} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetailPage;
