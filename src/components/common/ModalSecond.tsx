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
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      openSecondModal(id);
    }
    return () => {
      closeSecondModal(id);
    };
  }, [id]);

  return (
    <dialog ref={dialogRef} {...rest}>
      {children}
    </dialog>
  );
}
