import React from "react";
import ReviewForm from "./ReviewForm";
import Modal from "../common/Modal";
import { REVIEW_MODE } from "@/types/reviewTypes";

interface ReviewModalProps {
  mode?: REVIEW_MODE;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  mode = REVIEW_MODE.EDIT,
}) => {
  return (
    <Modal className="bg-[#101318] bg-opacity-30 rounded-16">
      <div className="bg-white max-w-375 md:max-w-528">
        <ReviewForm mode={mode} />
      </div>
    </Modal>
  );
};

export default ReviewModal;
