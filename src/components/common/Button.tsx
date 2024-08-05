interface ButtonProps {
  title: string;
  icon?: "delete" | "plus";
  items: keyof typeof itemVariants;
  isModal?: boolean;
  onClick?: () => void;
}

const itemVariants = {
  goWine:
    "flex-center w-auto h-50 rounded-100 px-96 py-16 font-bold-16 text-white bg-main",
  signUp:
    "flex-center w-full h-48 rounded-16 px-172 py-16 font-bold-16 text-white bg-main " +
    "lg:h-50",
  signIn:
    "flex-centerw-full h-48 rounded-16 px-172 py-16 font-bold-16 text-white bg-main " +
    "lg:h-50",
  wineRegister:
    "flex-center w-343 h-48 px-172 py-16 bg-main font-bold-16 text-white rounded-16 " +
    "md:w-220 md:h-48 md:h-48 md:gap-10 md:px-0 md:bg-black " +
    "lg:w-full lg:h-50 lg:bg-red-600",
  wineTypes:
    "flex-center w-auto h-42 px-18 py-10 font-medium-16 bg-white text-[#2D3034] border border-grayscale-300 rounded-100 ",
  reviewSubmit:
    "flex-center w-auto h-40 px-18 py-16 font-bold-16 bg-main text-white rounded-12 " +
    "lg:px-18 lg:h-42",
  changeProfile:
    "flex-center w-auto h-42 px-20 py-16 font-bold-16 bg-main text-white rounded-12 " +
    "md:h-48 md:px-30 " +
    "lg:h-42",

  delete:
    "flex-center w-156 h-54 px-36 py-16 rounded-12 bg-main font-bold-16 text-white",
  wineRegisterCancel:
    "flex-center w-96 h-54 px-0 py-16 rounded-12 bg-main-10 font-bold-16 text-main " +
    "lg:w-108 lg:px-36",
};

export default function Button(props: ButtonProps) {
  const { title, icon, items, onClick, isModal } = props;

  return (
    <button className={itemVariants[items]} onClick={onClick}>
      {title}
      {/* 버튼 이름 */}
    </button>
  );
}
