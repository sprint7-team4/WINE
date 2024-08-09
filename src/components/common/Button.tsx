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
    "flex-center w-full h-48 rounded-16 px-172 py-16 font-bold-16 text-white bg-main " +
    "lg:h-50",
  wineRegister:
    "w-[70%] h-54 bg-main font-bold-16 text-white rounded-12 whitespace-nowrap " +
    "md:w-294",
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
    "w-[30%] h-54 rounded-12 bg-main-10 font-bold-16 text-main whitespace-nowrap " +
    "md:w-108",
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
