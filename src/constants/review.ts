import { BalancedProfile, WineBalance } from "@/types/reviewTypes";

export const balancedProfiles: Record<keyof WineBalance, BalancedProfile> = {
  drySweet: {
    name: "바디감",
    minimumText: "가벼워요",
    maximumText: "진해요",
    scale: 0,
  },
  lightBold: {
    name: "타닌",
    minimumText: "부드러워요",
    maximumText: "떫어요",
    scale: 0,
  },
  smoothTannic: {
    name: "당도",
    minimumText: "드라이해요",
    maximumText: "달아요",
    scale: 0,
  },
  softAcidic: {
    name: "산미",
    minimumText: "안셔요",
    maximumText: "많이셔요",
    scale: 0,
  },
};
