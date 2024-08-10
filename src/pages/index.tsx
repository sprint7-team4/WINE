import Image from "next/image";
import LogoPurple from "@/assets/img/logo-purple.svg";
import LandingWine1 from "@/assets/img/landing-wine1.svg";
import LandingWine2 from "@/assets/img/landing-wine2.svg";
import LandingWine3 from "@/assets/img/landing-wine3.svg";
import LandingWine4 from "@/assets/img/landing-wine4.svg";
import LandingWine5 from "@/assets/img/landing-wine5.svg";
import LandingCard1 from "@/assets/img/landing-card1.svg";
import LandingCard2 from "@/assets/img/landing-card2.svg";
import LandingCard3 from "@/assets/img/landing-card3.svg";
import LandingCard4 from "@/assets/img/landing-card4.svg";

import Button from "@/components/common/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const routeToWineList = () => {
    router.push("/wines");
  };
  return (
    <div className="bg-grayscale-100 pt-174 w-full pb-109">
      <div className="max-w-1140 h-full w-full mx-auto ">
        <div className="w-full h-535 bg-[#171A21] mb-160 rounded-16 flex-center relative">
          <div className="flex-center flex-col gap-32 absolute top-112">
            <Image
              src={LogoPurple}
              alt="랜딩페이지 로고"
              width={102}
              height={28.8}
            />
            <h2 className="font-bold-32 text-white text-center">
              한 곳에서 관리하는
              <br />
              나만의 와인창고
            </h2>
          </div>
          <div className="absolute bottom-0 w-full">
            <Image
              src={LandingWine1}
              alt="와인1"
              width={232}
              height={185}
              layout="intrinsic"
              className="absolute bottom-0 left-[8.6%]"
            />
            <Image
              src={LandingWine2}
              alt="와인2"
              width={232}
              height={185}
              layout="intrinsic"
              className="absolute bottom-0 left-[22.5%]"
            />
            <Image
              src={LandingWine5}
              alt="와인5"
              width={232}
              height={185}
              layout="intrinsic"
              className="absolute bottom-0 left-[71.1%]"
            />
            <Image
              src={LandingWine4}
              alt="와인4"
              width={232}
              height={185}
              layout="intrinsic"
              className="absolute bottom-0 left-[57.2%]"
            />
            <Image
              src={LandingWine3}
              alt="와인3"
              width={232}
              height={185}
              layout="intrinsic"
              className="absolute bottom-0 left-[39.8%]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-699 h-full relative">
        <div className="w-640 h-320 rounded-16 bg-[#EBEEF4] border border-color-[#E0E6EE] outline-1 border-solid relative">
          <div className="flex flex-col gap-8 absolute top-56 left-32">
            <p className="text-grayscale-800 font-bold-24 inline-block">
              매달 새롭게 만나는
              <br />
              와인 추천 콘텐츠
            </p>
            <p className="font-regular-12 text-grayscale-500 inline-block">
              매달 다양한 인기 와인을 만나보세요.
            </p>
          </div>
          <div className="w-356 h-277  absolute top-41 left-282 bg-grayscale-100 rounded-tl-16 rounded-br-16">
            <h3 className="font-bold-18 absolute top-20 left-20">
              이번 달 추천 와인
            </h3>
          </div>
        </div>
        <Image
          className="absolute top-103 left-303"
          src={LandingCard1}
          alt="랜딩카드1"
          width={193}
          height={160}
        />
        <Image
          className="absolute top-103 right-0 src={LandingCard2}"
          src={LandingCard2}
          alt="랜딩카드2"
          width={193}
          height={160}
        />
      </div>

      <div className="mx-auto w-699 h-full relative mt-96">
        <div className="w-640 h-320 rounded-16 bg-[#EBEEF4] border border-color-[#E0E6EE] outline-1 border-solid relative overflow-hidden">
          <div className="flex flex-col gap-8 absolute top-56 left-32">
            <p className="text-grayscale-800 font-bold-24 inline-block">
              다양한 필터로 찾는
              <br />내 맞춤 와인
            </p>
            <p className="font-regular-12 text-grayscale-500 inline-block">
              와인 타입, 가격, 평점으로
              <br />
              나에게 맞는 와인을 쉽게 검색해요.
            </p>
          </div>
          <Image
            src={LandingCard3}
            alt="랜딩카드3"
            width={341}
            height={388}
            className="absolute top-7 left-300"
          />
        </div>
      </div>

      <div className="mx-auto w-699 h-full relative mt-96 mb-104">
        <div className="w-640 h-320 rounded-16 bg-[#EBEEF4] border border-color-[#E0E6EE] outline-1 border-solid relative  overflow-hidden">
          <div className="flex flex-col gap-8 absolute top-56 left-32">
            <p className="text-grayscale-800 font-bold-24 inline-block">
              직관적인
              <br />
              리뷰 시스템
            </p>
            <p className="font-regular-12 text-grayscale-500 inline-block">
              더 구체화된 리뷰 시스템으로
              <br />
              쉽고 빠르게 와인 리뷰를 살펴보세요.
            </p>
          </div>
          <Image
            src={LandingCard4}
            alt="랜딩카드4"
            width={272.68}
            className="absolute left-322"
          />
        </div>
      </div>
      <div className="mx-auto w-full flex-center">
        <Button
          title="와인 보러가기"
          items="goWine"
          onClick={routeToWineList}
        />
      </div>
    </div>
  );
}
