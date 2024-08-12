import { Wine } from "@/types/myProfileTypes";
import Image from "next/image";
import testWine from "@/assets/img/wineImg.svg";
import Dropdown from "../common/Dropdown";
import menuImg from "@/assets/img/3dot-large.svg";
import { EDIT_MENU, MenuItem } from "@/constants/dropdown";
import { showToast } from "../common/Toast";
import useModalStore from "@/store/modalStore";
import { useReviewRerenderStore } from "@/store/reviewStore";
import { deleteReview } from "@/lib/reviewApi";

interface myWineCardProps {
  wine: Wine;
}

// function MyWineCard({ wine }: myWineCardProps) {
//   return <div className="w-auto flex gap-20">와인 이름</div>;
// }

// export default MyWineCard;

function MyWineCard({ wine }: any) {
  const { openModal } = useModalStore();

  const setReviewRerendered = useReviewRerenderStore(
    (state) => state.setReviewRerendered
  );

  const handleSelect = async (item: MenuItem) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      showToast("권한이 없습니다. 로그인을 해주세요", "error");
      return;
    }
    if (item === EDIT_MENU.EDIT) {
      openModal();
    } else if (item === EDIT_MENU.DELETE) {
      try {
        await deleteReview(wine.id);
        setReviewRerendered(true);
        showToast("삭제되었습니다!", "success");
      } catch (error) {
        console.error("Failed to delete review", error);
        showToast("유효한 로그인이 아니거나, 삭제 권한이 없습니다.", "error");
      }
    }
  };
  return (
    <div className="w-auto h-164 mt-20 px-20  rounded-12 border border-color-grayscale-300 relative">
      <div className="flex items-center gap-20 h-full">
        <div className="relative w-53 h-full">
          <img
            src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/8/1722402160581/wine1.png"
            className="absolute bottom-0 h-185 w-53 object-bottom"
          />
        </div>
        <div className="flex flex-col gap-15">
          <p className="font-bold-20 w-187">
            Sentinel Carbernet Sauvignon 2016
          </p>
          <div className="flex flex-col gap-4.5">
            <p className="font-medium-14 text-grayscale-500">와인 지역</p>
            <div className="w-fit h-full rounded-10 px-10 py-6 bg-main-10">
              <p className="flex-center font-bold-14 text-main">₩ 64,950</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-10">
        <Dropdown
          trigger={<Image src={menuImg} alt="메뉴" width={24} height={24} />}
          items={[EDIT_MENU.EDIT, EDIT_MENU.DELETE]}
          onSelect={handleSelect}
        ></Dropdown>
      </div>
    </div>
  );
}

export default MyWineCard;
