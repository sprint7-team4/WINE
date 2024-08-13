import React, { useRef, useEffect } from "react";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmButtonText = "확인",
  cancelButtonText = "취소",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="pt-32 px-16 w-353 h-182 border-1 border-solid boder-grayscale-300 rounded-16 bg-white"
    >
      <div className="">
        <p className="mb-40 font-bold-20 text-grayscale-800 text-center">
          {message}
        </p>
        <div className="flex gap-10">
          <button
            onClick={() => {
              onCancel();
              dialogRef.current?.close();
            }}
            className="w-156 h-54 border-1 border-solid border-grayscale-300 rounded-12 font-bold-16 bg-white text-grayscale-500"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              dialogRef.current?.close();
            }}
            className="w-156 h-54 rounded-12 font-bold-16 bg-main text-white"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmPopup;

{
  /* <ModalSecond
  id={`${wineId}delete`}
  className="pt-32 px-16 w-353 h-182 border-1 border-solid boder-grayscale-300 rounded-16 bg-white"
>
  <h2 className="mb-40 font-bold-20 text-grayscale-800 text-center">
    정말 삭제하시겠습니까?
  </h2>
  <div className="flex gap-10">
    <button
      className="w-156 h-54 border-1 border-solid border-grayscale-300 rounded-12 font-bold-16 bg-white text-grayscale-500"
      type="button"
      title="취소"
      onClick={handleCancleClick}
    >
      취소
    </button>
    <button
      className="w-156 h-54 rounded-12 font-bold-16 bg-main text-white"
      type="button"
      title="삭제하기"
      onClick={handleDeleteClick}
    >
      삭제하기
    </button>
  </div>
</ModalSecond>; */
}
