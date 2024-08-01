import Link from "next/link";
import Image from "next/image";
import white_logo from "@/assets/img/logo-white.svg";

export default function Header() {
  return (
    <header
      role="banner"
      className="flex justify-between items-center fixed top-0 inset-x-0 mx-16 md:mx-20 lg:mx-auto mt-16 md:mt-24 px-20 md:px-60 lg:max-w-[1140px] h-50 md:h-70 rounded-16 bg-black"
    >
      <Link href="/" className="flex">
        <button type="button" title="메인로고버튼" className="h-15">
          <Image src={white_logo} alt="메인로고이미지" width="52" height="15" />
        </button>
      </Link>
      <div className="flex-center gap-20 md:gap-40 font-medium-16 text-white">
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </div>
    </header>
  );
}
