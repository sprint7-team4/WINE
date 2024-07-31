import Image from "next/image";
import LogoPurple from "@/assets/img/logo-purple.svg";
import LandingWine1 from "@/assets/img/landing-wine1.svg";
import LandingWine2 from "@/assets/img/landing-wine2.svg";
import LandingWine3 from "@/assets/img/landing-wine3.svg";
import LandingWine4 from "@/assets/img/landing-wine4.svg";
import LandingWine5 from "@/assets/img/landing-wine5.svg";

export default function Home() {
  return (
    <>
      <div className="max-w-1140 h-full w-full mx-auto">
        <div className="w-full h-535 bg-black mb-160 rounded-16 flex-center relative">
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
          <div>
            <Image
              src={LandingWine1}
              alt="와인1"
              width={232}
              height={185}
              className="absolute bottom-0 left-98"
            />
            <Image
              src={LandingWine2}
              alt="와인2"
              width={232}
              height={185}
              className="absolute bottom-0 left-256"
            />
            <Image
              src={LandingWine3}
              alt="와인3"
              width={232}
              height={185}
              className="absolute bottom-0 left-454"
            />
            <Image
              src={LandingWine5}
              alt="와인5"
              width={232}
              height={185}
              className="absolute bottom-0 right-98"
            />
            <Image
              src={LandingWine4}
              alt="와인4"
              width={232}
              height={185}
              className="absolute bottom-0 right-256"
            />
          </div>
        </div>
      </div>
    </>
  );
}
