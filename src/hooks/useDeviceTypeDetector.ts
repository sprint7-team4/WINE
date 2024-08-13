import { useEffect, useState, useCallback } from "react";
import { useLayoutStore } from "@/store/layoutStore";
import { useDebounce } from "@/hooks/useDebounce";

export const useDeviceTypeDetector = () => {
  const { setDeviceType } = useLayoutStore();
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const debouncedWidth = useDebounce(windowWidth, 50); // 50ms 디바운스

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 초기 윈도우 너비 설정
      setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  useEffect(() => {
    if (debouncedWidth !== null) {
      if (debouncedWidth < 767) {
        setDeviceType("mobile");
      } else if (debouncedWidth < 1040) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    }
  }, [debouncedWidth, setDeviceType]);

  // 서버 사이드 렌더링을 위한 초기 디바이스 타입 설정
  useEffect(() => {
    if (typeof window === "undefined") {
      setDeviceType("desktop"); // 또는 적절한 기본값
    }
  }, [setDeviceType]);
};
