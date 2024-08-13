import { ReactNode, useEffect, useRef } from "react";
import useModalSecondStore from "@/store/newModalStore";

interface Props {
  children: ReactNode;
  className?: string;
  id: string;
}

export default function Dialog({ children, id, ...rest }: Props) {
  const { modals, openSecondModal, closeSecondModal } = useModalSecondStore();
  const isOpen = modals[id] || false;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    const handleClose = () => {
      closeSecondModal(id); // 모달이 닫힐 때 상태를 업데이트
    };

    if (dialogElement) {
      dialogElement.addEventListener("close", handleClose);

      if (isOpen) {
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        dialogElement.removeEventListener("close", handleClose);
      };
    }
  }, [isOpen, id, closeSecondModal]);

  useEffect(() => {
    if (isOpen) {
      openSecondModal(id);
    }

    return () => {
      closeSecondModal(id);
    };
  }, [id, openSecondModal, closeSecondModal]);

  return (
    <dialog ref={dialogRef} {...rest}>
      {children}
    </dialog>
  );
}
