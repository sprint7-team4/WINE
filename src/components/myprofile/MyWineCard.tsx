import { Wine } from "@/types/myProfileTypes";
import Image from "next/image";
import testWine from "@/assets/img/wineImg.svg";
import Dropdown from "../common/Dropdown";
import menuImg from "@/assets/img/3dot-large.svg";
import { EDIT_MENU, MenuItem } from "@/constants/dropdown";
import { showToast } from "../common/Toast";
import useModalSecondStore from "@/store/newModalStore";
import WineEditModal from "../wineListPage/WineEditModal";
import MyWineDeleteModal from "./MyWineDeleteModal";

interface myWineCardProps {
  wine: Wine;
}

// function MyWineCard({ wine }: myWineCardProps) {
//   return <div className="w-auto flex gap-20">와인 이름</div>;
// }

// export default MyWineCard;

function MyWineCard({ wine }: myWineCardProps) {
  const { openSecondModal } = useModalSecondStore();

  const handleSelect = async (item: MenuItem) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      showToast("권한이 없습니다. 로그인을 해주세요", "error");
      return;
    }
    if (item === EDIT_MENU.EDIT) {
      openSecondModal(`${wine.id}`);
    } else if (item === EDIT_MENU.DELETE) {
      openSecondModal(`${wine.id}delete`);
    }
  };
  return (
    <div className="w-auto h-164 mt-20 px-20  rounded-12 border border-color-grayscale-300 relative">
      <div className="flex items-center gap-20 h-full">
        <div className="relative w-53 h-full">
          <img
            src={wine.image}
            alt="wine_img"
            className="absolute bottom-0 h-185 w-53 object-cover"
          />
        </div>
        <div className="flex flex-col gap-15">
          <p className="font-bold-20 w-187">{wine.name}</p>
          <div className="flex flex-col gap-4.5">
            <p className="font-medium-14 text-grayscale-500">{wine.region}</p>
            <div className="w-fit h-full rounded-10 px-10 py-6 bg-main-10">
              <p className="flex-center font-bold-14 text-main">
                ₩ {wine.price}
              </p>
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
      <WineEditModal wineId={wine.id} wineData={wine} />
      <MyWineDeleteModal wineId={wine.id} />
    </div>
  );
}

export default MyWineCard;
