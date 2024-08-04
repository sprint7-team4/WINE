interface ButtonProps {
  title: string;
  icon?: "delete" | "plus";
  items: keyof typeof itemVariants;
}

const itemVariants = {
  goWine:
    "flex-center w-auto h-50 rounded-100 px-96 py-16 font-bold-16 text-white bg-main",
  signUp:
    "flex-center w-full h-50 rounded-16 px-172 py-16 font-bold-16 text-white bg-main",
  signIn:
    "flex-centerw-full h-50 rounded-16 px-172 py-16 font-bold-16 text-white bg-main",
  wineRegister:
    "flex-center w-auto h-50 px-172 py-16 bg-main font-bold-16 text-white rounded-16",
  wineTypes:
    "flex-center w-auto h-42 px-18 py-10 font-medium-16 bg-white text-[#2D3034] border border-grayscale-300 rounded-100 ",
  reviewSubmit:
    "flex-center w-auto h-42 px-20 py-16 font-bold-16 bg-main text-white rounded-12",
  changeProfile:
    "flex-center w-auto h-42 px-20 py-16 font-bold-16 bg-main text-white rounded-12",
  delete:
    "flex-center w-156 h-54 px-36 py-16 rounded-12 bg-main font-bold-16 text-white",
};

export default function Button(props: ButtonProps) {
  return (
    <button className={`${itemVariants[props.items]}`}>
      {props.title}
      {/* 버튼 이름 */}
    </button>
  );
}
