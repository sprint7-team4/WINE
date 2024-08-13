import React, { useEffect, useState } from "react";
import { Review, Wine } from "@/types/myProfileTypes";
import Image from "next/image";
import star from "@/assets/img/colorStar.svg";
import { getElapsedTime } from "@/utils/wineDetailUtils";
import { REVIEW_MODE } from "@/types/reviewTypes";
import Dropdown from "../common/Dropdown";
import menuImg from "@/assets/img/3dot-large.svg";
import { EDIT_MENU, MenuItem } from "@/constants/dropdown";
import {
  useReviewRerenderStore,
  useReviewStore,
  useWineNameStore,
} from "@/store/reviewStore";
import { showToast } from "../common/Toast";
import useModalStore from "@/store/modalStore";
import { deleteReview } from "@/lib/reviewApi";
import Link from "next/link";
import ConfirmPopup from "../common/ConfirmPopup";

interface MyReviewCardProps {
  review: Review;
  mode: REVIEW_MODE;
}

const MyReviewCard: React.FC<MyReviewCardProps> = ({ review, mode }) => {
  const { isReviewRerendered, setReviewRerendered } = useReviewRerenderStore();
  const { setReviewId } = useReviewStore((state) => ({
    setReviewId: state.setReviewId,
  }));
  const { openModal } = useModalStore();

  const { setWineName } = useWineNameStore((state) => ({
    wineName: state.wineName,
    setWineName: state.setWineName,
  }));
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const handleSelect = async (item: MenuItem) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      showToast("권한이 없습니다. 로그인을 해주세요", "error");
      return;
    }
    if (item === EDIT_MENU.EDIT) {
      setReviewId(review.id);
      setWineName(review.wine.name);
      openModal();
    } else if (item === EDIT_MENU.DELETE) {
      setIsConfirmVisible(true);
    }
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteReview(review.id);
      setReviewRerendered(true);
      setIsConfirmVisible(false);
      showToast("삭제되었습니다!", "success");
    } catch (error) {
      console.error("Failed to delete review", error);
      showToast("유효한 로그인이 아니거나, 삭제 권한이 없습니다.", "error");
    }
  };

  useEffect(() => {
    if (isReviewRerendered) {
      setReviewRerendered(false);
    }
  }, [isReviewRerendered, setReviewRerendered]);

  return (
    <div className="w-auto flex flex-col gap-17 px-20 py-16 rounded-16 border border-color-grayscale-300">
      <div className="flex justify-between w-auto">
        <div className="flex justify-between items-center gap-15">
          <div className="w-auto h-32 flex-center gap-2 rounded-12 px-10 py-6 bg-main-10 md:px-15 md:py-8">
            <Image
              src={star}
              alt="별점"
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <p className="font-bold-14 text-main">{review.rating}.0</p>
          </div>
          <p className="font-regular-16 text-grayscale-500">
            {getElapsedTime(review.createdAt)}
          </p>
        </div>
        <Dropdown
          trigger={<Image src={menuImg} alt="메뉴" width={24} height={24} />}
          items={[EDIT_MENU.EDIT, EDIT_MENU.DELETE]}
          onSelect={handleSelect}
        ></Dropdown>
      </div>
      <Link href={`/wines/${review.wine.id}`}>
        <div className="flex flex-col gap-10">
          <p className="font-medium-16 text-grayscale-500">
            {review.wine.name}
          </p>
          <p className="font-regular-16">{review.content}</p>
        </div>
      </Link>
      {isConfirmVisible && (
        <ConfirmPopup
          message="정말로 삭제하시겠습니까?"
          onConfirm={handleDeleteConfirm}
          onCancel={handleCancel}
          confirmButtonText="삭제"
          cancelButtonText="취소"
        />
      )}
    </div>
  );
};

export default MyReviewCard;
