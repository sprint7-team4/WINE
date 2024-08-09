import { useState, useEffect } from "react";
import Modal from "./common/Modal";
import Button from "./common/Button";
import useModalStore from "@/store/modalStore";
import photo_icon from "@/assets/img/photo.svg";

export default function WineRegistrationModal() {
  const { closeModal } = useModalStore();
  const [value, setValue] = useState({
    name: "",
    price: 0,
    region: "",
    image: "",
    type: "RED",
  });

  const handleRegisterClick = async () => {};

  return (
    <Modal className="p-24 w-[100%] md:w-460 rounded-16 text-grayscale-800">
      <h2 className="mb-32 md:mb-40 font-bold-20 md:font-bold-24">와인 등록</h2>
      <form className="flex flex-col">
        <label
          htmlFor="name"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          와인 이름
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="와인 이름 입력"
          className="mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
        />
        <label
          htmlFor="price"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          가격
        </label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="가격 입력"
          className="mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
        />
        <label
          htmlFor="region"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          원산지
        </label>
        <input
          type="text"
          id="region"
          name="region"
          placeholder="원산지 입력"
          className="mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
        />
        <label
          htmlFor="image"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          와인 사진
        </label>
        <input type="file" id="image" name="image" className="hidden" />
        <button
          type="button"
          title="이미지 불러오기 버튼"
          className="flex-center mb-40 w-120 h-120 md:w-140 md:h-140 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
        >
          <img src={photo_icon.src} alt="이미지아이콘" />
        </button>
      </form>
      <div className="flex-center gap-8 md:gap-10">
        <Button items="wineRegisterCancel" title="취소" onClick={closeModal} />
        <Button
          items="wineRegister"
          title="와인 등록하기"
          onClick={handleRegisterClick}
        />
      </div>
    </Modal>
  );
}
