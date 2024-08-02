import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const showHeader = pageProps.showHeader !== false; // Header컴포넌트 조건부렌더링을 위한 변수

  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";
  const isExcludeMainArea = isAuthPage || router.pathname === "/";

  const mainClassName = `
  ${!isAuthPage ? "max-w-1140 m-[0_auto] px-16 md:px-20 lg:px-0" : "p-0"}
  ${isExcludeMainArea ? "mt-0" : "mt-[66px] md:mt-[94px]"}
`.trim();

  return (
    <>
      {showHeader && <Header />}
      <main className={mainClassName}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
