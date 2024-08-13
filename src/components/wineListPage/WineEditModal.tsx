import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PostWine, WineType } from "@/types/wineTypes";
import ModalSecond from "@/components/common/ModalSecond";
import Button from "@/components/common/Button";
import useModalSecondStore from "@/store/modalSecondStore";
import photo_icon from "@/assets/img/photo.svg";
import { editWine } from "@/lib/wineApi";
import { imageUpload } from "@/lib/imageApi";
import { showToast } from "@/components/common/Toast";

const wineType: WineType[] = ["RED", "WHITE", "SPARKLING"];

interface Props {
  wineData: PostWine;
  wineId: number;
}

export default function WineEditModal({ wineData, wineId }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const { closeSecondModal } = useModalSecondStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<PostWine>({
    mode: "onChange",
    defaultValues: wineData,
  });

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState(wineData.image);

  useEffect(() => {
    if (imgFile) {
      const objectUrl = URL.createObjectURL(imgFile);
      setImgPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imgFile]);

  const handleTypeClick = (wineType: WineType) => {
    setValue("type", wineType);
  };

  const handleImgBtnClick = () => {
    imageRef.current?.click();
  };

  const handleImgFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("이미지 파일만 업로드할 수 있습니다.", "error");
        return;
      }

      // 5MB 크기 제한 확인 (5MB = 5 * 1024 * 1024 바이트)
      if (file.size > 5 * 1024 * 1024) {
        showToast("5MB 이하의 이미지 파일만 업로드할 수 있습니다.", "error");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await imageUpload(formData);
        setValue("image", response, { shouldValidate: true });
        setImgFile(file);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        showToast("이미지 업로드에 실패했습니다.", "error");
      }
    }
  };

  const onSubmit: SubmitHandler<PostWine> = async (data) => {
    try {
      const modifiedData = { ...data, price: Number(data.price) };
      await editWine(wineId, modifiedData);
      showToast("와인 수정에 성공했습니다!", "success");
      handleCancelClick();
    } catch (error) {
      console.error("와인 수정 중 오류 발생:", error);
      showToast("정확한 값을 입력해주세요", "error");
    }
  };

  const handleCancelClick = () => {
    reset(wineData);
    setImgFile(null);
    setImgPreview(wineData.image);
    closeSecondModal(`${wineId}`);
  };

  return (
    <ModalSecond
      id={`${wineId}`}
      className="p-24 w-[100%] md:w-460 rounded-16 text-grayscale-800"
    >
      <h2 className="mb-32 md:mb-40 font-bold-20 md:font-bold-24">와인 수정</h2>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-10 mb-24">
          {wineType.map((type) => (
            <button
              key={type}
              type="button"
              title={type}
              onClick={() => handleTypeClick(type)}
              className={`h-42 px-18 border-1 border-solid border-grayscale-300 rounded-100 font-medium-16 ${watch("type") === type ? "bg-main text-white" : "text-grayscale-800"}`}
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
        <Controller
          name="name"
          control={control}
          rules={{
            required: "와인 이름을 입력해주세요",
            maxLength: {
              value: 30,
              message: "와인 이름은 30자 이하로 입력해주세요",
            },
            validate: (value) => !!value.trim() || "공백만 입력할 수 없습니다.",
          }}
          render={({ field }) => (
            <>
              <input
                {...field}
                id="name"
                placeholder="와인 이름 입력"
                className={`mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid ${errors.name ? "border-red-500" : "border-grayscale-300"} rounded-12 md:rounded-16`}
                onBlur={async () => {
                  await trigger("name");
                  field.onBlur();
                }}
              />
              {errors.name && (
                <span className="text-red-500 relative top-[-15px] md:top-[-23px]">
                  {errors.name.message}
                </span>
              )}
            </>
          )}
        />

        <label
          htmlFor="price"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          가격
        </label>
        <Controller
          name="price"
          control={control}
          rules={{
            required: "가격을 입력해주세요",
            min: {
              value: 1000,
              message: "가격은 최소 1,000원이어야 합니다.",
            },
            max: {
              value: 1000000,
              message: "가격은 1,000,000원 이하로 입력해주세요",
            },
            validate: (value) =>
              !!value.toString().trim() || "공백만 입력할 수 없습니다.",
          }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="price"
              placeholder="가격 입력"
              className={`mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid ${errors.price ? "border-red-500" : "border-grayscale-300"} rounded-12 md:rounded-16`}
            />
          )}
        />
        {errors.price && (
          <span className="text-red-500 relative top-[-15px] md:top-[-23px]">
            {errors.price.message}
          </span>
        )}

        <label
          htmlFor="region"
          className="mb-14 md:mb-16 font-medium-14 md:font-medium-16"
        >
          원산지
        </label>
        <Controller
          name="region"
          control={control}
          rules={{
            required: "원산지를 입력해주세요",
            maxLength: {
              value: 15,
              message: "원산지는 15자 이하로 입력해주세요",
            },
            validate: (value) => !!value.trim() || "공백만 입력할 수 없습니다.",
          }}
          render={({ field }) => (
            <>
              <input
                {...field}
                id="region"
                placeholder="원산지 입력"
                className={`mb-24 md:mb-32 px-20 h-42 md:h-48 border-1 border-solid ${errors.region ? "border-red-500" : "border-grayscale-300"} rounded-12 md:rounded-16`}
                onBlur={async () => {
                  await trigger("region");
                  field.onBlur();
                }}
              />
              {errors.region && (
                <span className="text-red-500 relative top-[-15px] md:top-[-23px]">
                  {errors.region.message}
                </span>
              )}
            </>
          )}
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
          accept="image/*"
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
                alt="이미지 미리보기"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="flex-center gap-8 md:gap-10">
          <button
            className="w-[30%] md:w-108 h-54 rounded-12 bg-main-10 font-bold-16 text-main whitespace-nowrap"
            type="button"
            title="취소"
            onClick={handleCancelClick}
          >
            취소
          </button>
          <button
            className={`w-[70%] md:w-294 h-54 ${isValid ? "bg-main" : "bg-gray-300"} font-bold-16 text-white rounded-12 whitespace-nowrap`}
            type="button"
            title="와인 수정하기"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            수정하기
          </button>
        </div>
      </form>
    </ModalSecond>
  );
}
