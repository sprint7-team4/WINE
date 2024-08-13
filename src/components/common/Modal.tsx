import { useRef, useEffect, ReactNode } from "react";
import useModalStore from "@/store/modalStore";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Modal({ children, ...rest }: Props) {
  const { isOpen, closeModal } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    // handleClose 함수 정의
    const handleClose = () => {
      closeModal(); // 모달이 닫힐 때 스토어의 상태를 업데이트
    };

    if (dialogElement) {
      dialogElement.addEventListener("close", handleClose);

      if (isOpen) {
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }

      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        dialogElement.removeEventListener("close", handleClose);
      };
    }
  }, [isOpen, closeModal]);

  return (
    <dialog ref={dialogRef} {...rest}>
      {children}
    </dialog>
  );
}
// Modal 컴포넌트 사용법 예시

// import useModalStore from "@/store/modalStore";
// import Modal from "@/components/common/Modal";

// export default function Login() {
//   const { openModal, closeModal } = useModalStore();

//   return (
//     <div>
//       <button type="button" onClick={openModal}>
//         모달창 열기
//       </button>
//       <Modal className="w-100 h-100">
//         <button type="button" onClick={closeModal}>
//           X
//         </button>
//         <div>모달 내용</div>
//       </Modal>
//     </div>
//   );
// }
