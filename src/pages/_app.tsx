import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components//common/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const showHeader = pageProps.showHeader !== false; // Header컴포넌트 조건부렌더링을 위한 변수

  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <>
      {showHeader && <Header />}
      <main
        className={
          isAuthPage
            ? "mt-0"
            : "max-w-1140 m-[0_auto] mt-[66px] md:mt-[94px] px-16 md:px-20 lg:px-0"
        }
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
