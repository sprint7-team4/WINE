import React, { useState } from "react";

const MAX_STAR_COUNT = 5;

interface InteractiveStarRatingProps {
  initialRating: number;
  size?: number;
  onRatingChange?: (newRating: number) => void;
}

const InteractiveStarRating: React.FC<InteractiveStarRatingProps> = ({
  initialRating,
  size = 22.8,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleClick = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const effectiveRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <div className="flex items-center">
      {[...Array(MAX_STAR_COUNT)].map((_, index) => (
        <i
          key={`star-${index}`}
          className={`p-[4px] fas fa-star ${index < Math.floor(effectiveRating) ? "text-main" : "text-grayscale-300"}`}
          style={{ fontSize: `${size}px` }}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default InteractiveStarRating;
