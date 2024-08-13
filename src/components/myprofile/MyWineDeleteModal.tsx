import useModalSecondStore from "@/store/newModalStore";
import ModalSecond from "@/components/common/ModalSecond";
import { deleteWine } from "@/lib/wineApi";
import { showToast } from "../common/Toast";
import { useWineRerenderStore } from "@/store/wineStore";

interface Props {
  wineId: number;
}

export default function MyWineDeleteModal({ wineId }: Props) {
  const { closeSecondModal } = useModalSecondStore();
  const { setMyWineRerendered } = useWineRerenderStore();

  const handleDeleteClick = async () => {
    try {
      await deleteWine(wineId);

      setMyWineRerendered(true);
      handleCancleClick();
      showToast("삭제되었습니다!", "success");
    } catch (error) {
      console.error("Failed to delete review", error);
      showToast("유효한 로그인이 아니거나, 삭제 권한이 없습니다.", "error");
    }
  };

  const handleCancleClick = () => {
    closeSecondModal(`${wineId}delete`);
  };

  return (
    <ModalSecond
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
    </ModalSecond>
  );
}
