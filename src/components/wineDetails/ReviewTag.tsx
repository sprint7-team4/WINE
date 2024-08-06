import { REVIEW_MODE } from "@/types/reviewTypes";

interface ReviewTagProps {
  mode?: REVIEW_MODE;
  tag: string;
  isSelected?: boolean;
  onClick?: (tag: string) => void;
}

const ReviewTag: React.FC<ReviewTagProps> = ({
  mode = REVIEW_MODE.REVIEW,
  tag,
  isSelected,
  onClick,
}) => {
  return (
    <h3
      className={`flex flex-center rounded-100 p-[6px_10px] md:p-[8px_15px] font-medium-16 ${
        isSelected
          ? "text-white bg-main border-main"
          : "text-grayscale-800 border-grayscale-300"
      } border border-solid ${mode !== REVIEW_MODE.REVIEW ? "cursor-pointer" : "cursor-default"}`}
      onClick={onClick ? () => onClick(tag) : undefined}
    >
      {tag}
    </h3>
  );
};

export default ReviewTag;
