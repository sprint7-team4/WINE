import { useEffect } from "react";
import { useRouter } from "next/router";
import { loginWithSocial } from "@/lib/authApi";
import { getHeaderStaticProps } from "@/utils/getHeaderStaticProps";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuthStore } from "@/store/authStore";

export const getStaticProps = async () => {
  return getHeaderStaticProps(false);
};

const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function KakaoAuthCallback() {
  const router = useRouter();
  const { code } = router.query;
  const { setUser } = useAuthStore();

  useEffect(() => {
    const loginWithKakao = async () => {
      if (code) {
        try {
          const response = await loginWithSocial({
            redirectUri: REDIRECT_URI,
            token: code,
            provider: "KAKAO",
          });
          setUser(response.user);
          router.push("/");
        } catch (error) {
          console.error("소셜 로그인 오류:", error);
        }
      }
    };

    loginWithKakao();
  }, [router]);
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
