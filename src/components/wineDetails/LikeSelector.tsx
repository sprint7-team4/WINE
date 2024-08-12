import Image from "next/image";
import defaultLikeImg from "@/assets/img/like.svg";
import selectedLikeImg from "@/assets/img/liked.svg";
import { useState, useEffect } from "react";
import { createLike, deleteLike } from "@/lib/reviewApi";

const LikeSelector = ({ id }: { id: number }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {}, [id]);

  const imageByState = selected ? selectedLikeImg : defaultLikeImg;

  const handleClick = async () => {
    try {
      if (selected) {
        // await deleteLike(id);
      } else {
        // await createLike(id);
      }
      setSelected((prevSelected) => !prevSelected);
    } catch (error) {
      console.error("즐겨찾기 처리에 실패했습니다:", error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        <Image
          src={imageByState}
          alt="즐겨찾기"
          width={38}
          height={38}
          className="w-32 h-32 md:w-38 md:h-38"
        />
      </button>
    </>
  );
};

export default LikeSelector;
