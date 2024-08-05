import { useEffect } from "react";
import { useRouter } from "next/router";

// accessToken이 localStorage에 존재할 때 or 존재하지 않을 때 페이지 리다이렉트 시키는 custom hook
const useRedirectAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const { pathname } = router;

    if (token) {
      if (pathname === "/login" || pathname === "/signup") {
        router.push("/");
      }
    } else {
      if (pathname === "/login" || pathname === "/signup") return;
      router.push("/login");
    }
  }, [router]);
};

export default useRedirectAuthenticated;
