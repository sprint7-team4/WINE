import { useRouter } from "next/router";
import { login } from "@/lib/authApi";
import { Tooltip } from "react-tooltip";

export default function GuestLogin() {
  const router = useRouter();

  const handleGuestLoginClick = async () => {
    try {
      await login({ email: "guest1004@gmail.com", password: "1234qwer!" });
      router.push("/");
    } catch (error) {
      console.error("게스트 로그인에 실패했습니다", error);
    }
  };
  return (
    <>
      <button
        type="button"
        title="게스트로그인버튼"
        onClick={handleGuestLoginClick}
        data-tooltip-id="my-tooltip"
        data-tooltip-html='<div style="text-align: center;">계정 없이 빠르게 체험해보세요!<br/>로그인을 직접 했을 때와 동일하게 동작합니다!</div>'
        className="flex-center gap-12 mb-16 w-[100%] h-48 md:h-50 border-1 border-solid border-grayscale-300 rounded-12 font-medium-14 md:font-medium-16 text-main"
      >
        게스트 로그인
      </button>
      <Tooltip id="my-tooltip" />
    </>
  );
}
