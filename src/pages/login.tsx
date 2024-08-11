import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import black_logo from "@/assets/img/logo-black.svg";
import LoginForm from "@/components/authentication/LoginForm";
import SocialLogin from "@/components/authentication/SocialLogin";
import GuestLogin from "@/components/authentication/guestLogin";
import { getHeaderStaticProps } from "@/utils/getHeaderStaticProps";
import { socialArray } from "@/constants/socialLogins";

export const getStaticProps = async () => {
  return getHeaderStaticProps(false);
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex-center min-h-screen bg-grayscale-100">
        <ClipLoader
          color="#cccccc"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

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
        <LoginForm />
        <GuestLogin />
        <div className="flex flex-col gap-16 mb-24 md:mb-32 w-[100%]">
          <SocialLogin socialData={socialArray} setIsLoading={setIsLoading} />
        </div>
        <div className="font-regular-14 md:font-regular-16 text-grayscale-500">
          계정이 없으신가요?
          <Link href="signup" className="ml-8 md:ml-14 text-main underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
