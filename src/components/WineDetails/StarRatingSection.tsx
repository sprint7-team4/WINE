import InstantRatingBar from "./InstantRatingBar";
import StarRating from "../StarRating";
import { Wine } from "@/types/wineTypes";

const MAX_BAR_WIDTH = 241;

const StarRatingSection = ({
  wine: { avgRating, reviewCount, avgRatings },
}: {
  wine: Wine;
}) => {
  const maxCount = Math.max(...Object.values(avgRatings));
  const sortedRatings = Object.entries(avgRatings).sort(
    ([a], [b]) => Number(b) - Number(a)
  );

  return (
    <section className="md:h-162 max-lg:grid grid-rows-1 md:grid-rows-2 max-lg:grid-cols-2 max-lg:max-w-578 m-[0_auto]">
      <div className="max-md:mb-24 max-md:flex max-md:flex-col">
        <div className="md:mt-18 lg:mt-0 flex items-center gap-20 mb-20 max-lg:mb-0 lg:row-span-1">
          <h1 className="text-36 font-extrabold leading-[42.96px] md:text-54 md:leading-[64.44px]">
            {avgRating.toFixed(1)}
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex">
              <StarRating rating={avgRating} />
            </div>
            <h3 className="font-regular-14 md:font-regular-16 text-grayscale-500">{`${reviewCount}개의 후기`}</h3>
          </div>
        </div>
      </div>
      <div className="max-md:row-start-2 max-md:col-span-2 flex flex-col gap-8">
        {sortedRatings.map(([rating, count]) => {
          return (
            <div key={rating} className="flex items-center mb-2 gap-15">
              <div className="flex w-24 font-medium-16 text-grayscale-500 flex-shrink-0">
                {rating}점
              </div>
              <InstantRatingBar count={count} maxCount={maxCount} />
            </div>
          );
        })}
      </div>
      <div className="max-md:flex max-md:justify-end">
        <button className="lg:row-span-2 w-100 h-40 md:w-113 md:h-42 lg:order-none mt-0 md:mt-20 lg:mt-30 bg-main font-bold-14 md:font-bold-16 text-white rounded-12">
          리뷰 남기기
        </button>
      </div>
    </section>
  );
};

export default StarRatingSection;
