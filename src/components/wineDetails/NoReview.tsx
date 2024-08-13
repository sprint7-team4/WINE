import noImage from "@/assets/img/noReview.svg";
import useModalStore from "@/store/modalStore";
import { useFormType } from "@/store/reviewStore";
import { REVIEW_MODE } from "@/types/reviewTypes";
import Image from "next/image";
const NoReview = () => {
  const { setFormType } = useFormType((state) => ({
    setFormType: state.setFormType,
  }));
  const { openModal } = useModalStore();

  const handleClick = () => {
    setFormType(REVIEW_MODE.CREATE);
    openModal();
  };

  return (
    <>
      <h2 className="font-bold-20 text-grayscale-800 lg:hidden">리뷰 목록</h2>
      <section className="w-full lg:w-800 flex flex-col flex-center mt-152">
        <Image
          className="w-100 h-100 md:w-136 md:h-136"
          src={noImage}
          alt="빈 리뷰"
          width={136}
          height={136}
        />
        <p className="mt 32 md:mt-24 font-regular-16 md:font-regular-18 text-grayscale-500">
          작성된 리뷰가 없어요
        </p>
        <button
          className="w-137 md:w-169 h-48 mt-40 md:mt-48 font-semibold-16 text-white bg-main rounded-12 btn-any"
          onClick={handleClick}
        >
          <span>리뷰 남기기</span>
        </button>
      </section>
    </>
  );
};

export default NoReview;
