import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/common/Header";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const showHeader = pageProps.showHeader !== false; // Header컴포넌트 조건부렌더링을 위한 변수

  const router = useRouter();
  const isExcludeMainArea =
    router.pathname === "/login" ||
    router.pathname === "/signup" ||
    router.pathname === "/";

  const mainClassName = `
  ${!isExcludeMainArea ? "m-[0_auto] px-16 md:px-20 lg:px-0 mt-[66px] md:mt-[94px] max-w-1140" : "p-0 mt-0"}
`.trim();

  return (
    <>
      <SessionProvider session={session}>
        {showHeader && <Header />}
        <main className={mainClassName}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </>
  );
}
