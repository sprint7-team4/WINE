import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components//common/Header";

export default function App({ Component, pageProps }: AppProps) {
  const showHeader = pageProps.showHeader !== false; // Header컴포넌트 조건부렌더링을 위한 변수

  return (
    <>
      {showHeader && <Header />}
      <main className="mt-[66px] md:mt-[94px]">
        <Component {...pageProps} />
      </main>
    </>
  );
}
