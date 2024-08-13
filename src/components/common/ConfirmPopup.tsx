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
    <dialog ref={dialogRef} className="rounded-lg p-[15px_25px] shadow-lg">
      <div className="text-center text-grayscale-800">
        <p className="mb-10">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              onConfirm();
              dialogRef.current?.close();
            }}
            className="bg-main text-white p-[6px_15px] rounded-10"
          >
            {confirmButtonText}
          </button>
          <button
            onClick={() => {
              onCancel();
              dialogRef.current?.close();
            }}
            className="bg-main-10 p-[6px_15px] rounded-10 text-main"
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmPopup;
