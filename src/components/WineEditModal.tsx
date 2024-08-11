import { useState, useEffect, useRef, ChangeEvent } from "react";
import { PostWine } from "@/types/wineTypes";
import Modal from "./common/Modal";
import Button from "./common/Button";
import useModalStore from "@/store/modalStore";
import photo_icon from "@/assets/img/photo.svg";
import { WineType } from "@/types/wineTypes";
import { editWine } from "@/lib/wineApi";
import { imageUpload } from "@/lib/imageApi";

const wineType: WineType[] = ["RED", "WHITE", "SPARKLING"];

interface Props {
  wineData: PostWine;
  wineId: string;
}

export default function WineEditModal({ wineData, wineId }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const { closeModal } = useModalStore();

  const [value, setValue] = useState<PostWine>({
    name: wineData.name,
    price: wineData.price,
    region: wineData.region,
    image: wineData.image,
    type: wineData.type,
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState(wineData.image);

  const handleTypeClick = (wineType: WineType) => {
    setValue((prev) => ({
      ...prev,
      type: wineType,
    }));
  };

  const handleImgBtnClick = () => {
    imageRef.current?.click();
  };

  const handleImgFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const response = await imageUpload(formData);
      setValue((prev) => ({
        ...prev,
        image: response,
      }));
      setImgFile(file);
    }
  };

  useEffect(() => {
    if (imgFile) {
      const objectUrl = URL.createObjectURL(imgFile);
      setImgPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imgFile]);

  const handleUpdateClick = async () => {
    try {
      await editWine(wineId, { ...value });
      handleCancelClick();
    } catch (error) {
      console.error("와인 수정 중 오류 발생:", error);
    }
  };

  const handleCancelClick = () => {
    closeModal();
  };

  return (
    <Modal className="p-24 w-[100%] md:w-460 rounded-16 text-grayscale-800">
      <h2 className="mb-32 md:mb-40 font-bold-20 md:font-bold-24">와인 수정</h2>
      <form className="flex flex-col">
        <div className="flex gap-10 mb-24">
          {wineType.map((type) => (
            <button
              key={type}
              type="button"
              title={type}
              onClick={() => handleTypeClick(type)}
              className={`h-42 px-18 border-1 border-solid border-grayscale-300 rounded-100 font-medium-16  ${value.type === type ? "bg-main text-white" : "text-grayscale-800"}`}
            >
              {type}
            </button>
          ))}
        </div>
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
          value={value.name}
          placeholder="와인 이름 입력"
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
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
          value={value.price}
          placeholder="가격 입력"
          onChange={(e) => {
            const newValue = e.target.value;

            const numericValue = Number(newValue);
            if (!isNaN(numericValue)) {
              setValue((prev) => ({
                ...prev,
                price: numericValue,
              }));
            }
          }}
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
          value={value.region}
          placeholder="원산지 입력"
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              region: e.target.value,
            }))
          }
          className="mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
        />
        <label
          htmlFor="image"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          와인 사진
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className="hidden"
          ref={imageRef}
          onChange={handleImgFileChange}
        />
        <div className="flex gap-10">
          <button
            type="button"
            title="이미지 불러오기 버튼"
            className="flex-center mb-40 w-120 h-120 md:w-140 md:h-140 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16"
            onClick={handleImgBtnClick}
          >
            <img src={photo_icon.src} alt="이미지아이콘" />
          </button>
          {imgPreview && (
            <div className="overflow-hidden w-120 h-120 md:w-140 md:h-140 border-1 border-solid border-grayscale-300 rounded-12 md:rounded-16 ">
              <img
                src={imgPreview}
                alt="이미지미리보기"
                className="w-120 h-120 md:w-140 md:h-140 object-cover"
              />
            </div>
          )}
        </div>
      </form>
      <div className="flex-center gap-8 md:gap-10">
        <Button
          items="wineRegisterCancel"
          title="취소"
          onClick={handleCancelClick}
        />
        <Button
          items="wineRegister"
          title="와인 수정하기"
          onClick={handleUpdateClick}
        />
      </div>
    </Modal>
  );
}
