import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;

  return (
    <div className="relative">
      <div className="flex items-center justify-start">
        {[...Array(5)].map((_, i) => (
          <i
            key={`gray-${i}`}
            className="fas fa-star w-18 h-18 text-grayscale-300"
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 flex items-center justify-start">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`yellow-${i}`} className="fas fa-star w-18 h-18 text-main" />
        ))}
        {partialStar > 0 && (
          <div className="relative w-18 h-18 overflow-hidden">
            <i
              className="fas fa-star absolute overflow-hidden top-0 left-0 text-main"
              style={{ width: `${partialStar * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
