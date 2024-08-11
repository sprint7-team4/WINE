// store/layoutStore.ts
import { create } from "zustand";

type DeviceType = "mobile" | "tablet" | "desktop";

interface LayoutState {
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  deviceType: "desktop",
  setDeviceType: (type) =>
    set({
      deviceType: type,
      isMobile: type === "mobile",
      isTablet: type === "tablet",
      isDesktop: type === "desktop",
    }),
  isMobile: false,
  isTablet: false,
  isDesktop: true,
}));
