import React from "react";
import useModalStore from "@/store/modalStore";
import ReviewForm from "./ReviewForm";
import Modal from "../common/Modal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const { closeModal } = useModalStore();

  if (!isOpen) return null;

  const handleCancle = () => {
    onClose();
    closeModal();
  };

  const handleSubmit = () => {};

  return (
    <Modal className="bg-[#101318] bg-opacity-30 rounded-16">
      <div className="bg-white max-w-528">
        <ReviewForm
          mode={"create"}
          onSubmit={handleSubmit}
          onCancel={handleCancle}
        />
      </div>
    </Modal>
  );
};

export default ReviewModal;
