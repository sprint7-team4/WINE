import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { loginWithSocial } from "@/lib/authApi";
import { getHeaderStaticProps } from "@/utils/getHeaderStaticProps";
import ClipLoader from "react-spinners/ClipLoader";

export const getStaticProps = async () => {
  return getHeaderStaticProps(false);
};

export default function GoogleAuthCallback() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const storedProvider = localStorage.getItem("provider");

    if (status === "authenticated" && storedProvider === "google") {
      const performLoginWithSocial = async () => {
        try {
          await loginWithSocial({
            token: session.idToken,
            provider: storedProvider.toUpperCase(),
          });
          router.push("/");
          localStorage.removeItem("provider");
        } catch (error) {
          console.error("소셜 로그인 오류:", error);
        }
      };

      performLoginWithSocial();
    }
  }, [status, session]);
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
