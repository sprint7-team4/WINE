import { useEffect, useRef, useState } from "react";

const InstantRatingBar = ({
  count,
  maxCount,
}: {
  count: number;
  maxCount: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const barWidth = (count / maxCount) * containerWidth;

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
    };
  }, []);

  return (
    <div className="flex w-full md:max-w-241 relative">
      <div
        className="w-full md:w-241 bg-grayscale-100 h-6 rounded-50 absolute left-0 -translate-y-1/2"
        ref={containerRef}
      ></div>
      <div
        className="bg-main h-6 rounded-50 absolute left-0 -translate-y-1/2"
        style={{ width: `${barWidth}px` }}
      ></div>
    </div>
  );
};

export default InstantRatingBar;
