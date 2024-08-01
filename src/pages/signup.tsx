import Link from "next/link";
import Image from "next/image";
import black_logo from "@/assets/img/logo-black.svg";
import { getHeaderStaticProps } from "@/utils/getHeaderStaticProps";
import SignupForm from "@/components/authentication/SignupForm";

export const getStaticProps = async () => {
  return getHeaderStaticProps(false);
};

export default function Signup() {
  return (
    <div className="flex-center px-16 py-60 min-h-screen bg-grayscale-100">
      <div className="flex flex-col items-center px-20 py-56 md:px-48 md:py-64 lg:py-80 w-[100%] md:w-496 rounded-16 bg-white">
        <Link href="/" className="mb-56 md:mb-64">
          <button type="button" title="메인로고버튼">
            <Image
              src={black_logo}
              alt="메인로고이미지"
              width="104"
              height="30"
            />
          </button>
        </Link>
        <SignupForm />
        <div className="font-regular-14 md:font-regular-16 text-grayscale-500">
          계정이 이미 있으신가요?
          <Link href="/login" className="ml-8 md:ml-14 text-main underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
