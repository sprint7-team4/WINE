import React from "react";

interface StarRatingProps {
  rating: number;
  size?: number; // 크기를 위한 새로운 prop 추가
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 18 }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;

  return (
    <div className="relative">
      <div className="flex items-center justify-start">
        {[...Array(5)].map((_, i) => (
          <i
            key={`gray-${i}`}
            className={`fas fa-star text-grayscale-300`}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 flex items-center justify-start">
        {[...Array(fullStars)].map((_, i) => (
          <i
            key={`purple-${i}`}
            className={`fas fa-star text-main`}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        ))}
        {partialStar > 0 && (
          <div
            className="relative overflow-hidden"
            style={{
              width: size === 18 ? `${size}px` : `${size - 6}px`,
              height: `${size}px`,
            }}
          >
            <i
              className="fas fa-star absolute overflow-hidden top-0 left-0 text-main"
              style={{ width: `${partialStar * 100}%`, height: `${size}px` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
