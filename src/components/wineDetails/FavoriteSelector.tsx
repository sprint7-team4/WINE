import Image from "next/image";
import defaultLikeImg from "@/assets/img/like.svg";
import selectedLikeImg from "@/assets/img/liked.svg";
import { useState, useEffect } from "react";
import HeartSVG from "./HeartSVG";

const FAVORTTE = "favorites";

const FavoriteSelector = ({ id }: { id: number }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem(FAVORTTE) || "[]");
    const isLiked = storedLikes.includes(id);
    setSelected(isLiked);
  }, [id]);

  const imageByState = selected ? selectedLikeImg : defaultLikeImg;

  const handleClick = async () => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem(FAVORTTE) || "[]");
      let updatedLikes;

      if (selected) {
        updatedLikes = storedLikes.filter((likeId: number) => likeId !== id);
      } else {
        updatedLikes = [...storedLikes, id];
      }

      localStorage.setItem(FAVORTTE, JSON.stringify(updatedLikes));
      setSelected((prevSelected) => !prevSelected);
    } catch (error) {
      console.error("즐겨찾기 처리에 실패했습니다:", error);
    }
  };

  return (
    <button onClick={handleClick} className="relative">
      <Image
        src={imageByState}
        alt="즐겨찾기"
        width={38}
        height={38}
        className="w-32 h-32 md:w-38 md:h-38"
      />
      <div className={`${!selected ? "hidden" : ""} pointer-events-none`}>
        <HeartSVG />
      </div>
    </button>
  );
};

export default FavoriteSelector;
