import { Wine } from "@/types/wineTypes";
import noWineImg from "@/assets/img/noWine.svg";
import Image from "next/image";

const WineHero = ({ wine: { image, name, price, region } }: { wine: Wine }) => {
  const heroImage = image !== "string" && image ? image : noWineImg;

  return (
    <section className="mt-[42px] h-190 md:h-260 border border-grayscale-300 border-solid rounded-16 p-[33px_20px_0_20px] md:p-[52px_60px_0_60px] lg:p-[52px_100px_0_100px] flex gap-86 relative">
      <Image
        src={heroImage}
        alt="대표 와인"
        width={58}
        height={209}
        priority
        className="object-cover w-58 h-209 md:w-84 md:h-302 lg:w-58 lg:h-209 max-lg:absolute max-lg:bottom-0 "
      />
      <div className="flex flex-col pl-20 lg:pl-0 md:pl-60 ml-58 md:ml-84 lg:ml-0">
        <h1 className="flex w-180 md:w-300 font-semibold text-30 leading-[35.8px] max-md:text-20 max-md:leading-[23.87px] text-grayscale-800 mb-15 md:mb-20">
          {name}
        </h1>
        <h2 className="font-regular-14 md:font-regular-16 text-grayscale-500 mb-[4.5px] md:mb-13">
          {region}
        </h2>
        <span className="w-86 h-36 md:w-114 md:h-37 font-bold-14 md:font-bold-18 text-main rounded-12 p-[6px_10px] md:p-[8px_15px] bg-main-10 flex-center whitespace-nowrap">
          ₩ {Number(price).toLocaleString()}
        </span>
      </div>
    </section>
  );
};

export default WineHero;
