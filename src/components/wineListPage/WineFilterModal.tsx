import React from "react";
import Image from "next/image";
import Modal from "@/components/common/ModalSecond";
import SideFiltering from "./SideFiltering";
import close from "@/assets/img/close.png";
import useModalSecondStore from "@/store/modalSecondStore";

interface WineFilterModalProps {
  id: string;
}

const WineFilterModal: React.FC<WineFilterModalProps> = () => {
  const { closeSecondModal } = useModalSecondStore();

  const handleClose = () => {
    console.log("closecloseclose:::");
    closeSecondModal("filter");
  };

  return (
    <Modal id={"filter"} className="w-full pt-20 rounded-16">
      <div className="w-327 h-800 pt-20 mx-auto">
        <div className="w-full flex justify-between mb-32">
          <span className="text-20 font-bold text-grayscale-800">필터</span>
          <div className="w-24 h-24" onClick={handleClose}>
            <Image src={close} alt="closeImage" width={24} height={24} />
          </div>
        </div>
        <div className="overflow-y-hidden h-500">
          <SideFiltering />
        </div>
      </div>
    </Modal>
  );
};

export default WineFilterModal;
