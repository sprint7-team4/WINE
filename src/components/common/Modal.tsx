import { useRef, useEffect, ReactNode } from "react";
import useModalStore from "@/store/modalStore";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Modal({ children, ...rest }: Props) {
  const { isOpen } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

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
