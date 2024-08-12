import useModalStore from "@/store/modalStore";
import Modal from "../common/Modal";
import SideFiltering from "./SideFiltering";
import close from "@/assets/img/close.png";
import Image from "next/image";

const WineFilterModal = () => {
  console.log("Modal:: 뜸");
  const { closeModal } = useModalStore();

  const handleClose = () => {
    console.log("closecloseclose:::");
    closeModal();
  };

  return (
    <Modal className="w-full flex-center pt-20 rounded-16">
      <div className="w-327 h-800 pt-20 mx-auto">
        <div className="w-full flex justify-between mb-32">
          <span
            className="text-20 font-bold text-grayscale-800"
            onClick={handleClose}
          >
            필터
          </span>
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
