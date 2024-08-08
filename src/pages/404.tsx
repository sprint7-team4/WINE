import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex-center flex-col pt-100">
      <h2 className="text-36 md:text-40 font-bold mb-16">404 ERROR</h2>
      <div className="text-center text-16 md:text-18 mb-20">
        페이지를 찾을 수 없습니다.
        <br />
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </div>
      <Link href="/">
        <button
          type="button"
          className="w-100 h-35 border-1 border-solid border-grayscale-300 rounded-10"
        >
          홈으로 이동
        </button>
      </Link>
    </div>
  );
}
