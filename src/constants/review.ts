export interface BalancedProfile {
  name: string;
  minimumText: string;
  maximumText: string;
  scale: number;
}

export const balancedProfiles: BalancedProfile[] = [
  {
    name: "바디감",
    minimumText: "가벼워요",
    maximumText: "진해요",
    scale: 0,
  },
  {
    name: "타닌",
    minimumText: "부드러워요",
    maximumText: "떫어요",
    scale: 0,
  },
  {
    name: "당도",
    minimumText: "드라이해요",
    maximumText: "달아요",
    scale: 0,
  },
  {
    name: "산미",
    minimumText: "안셔요",
    maximumText: "많이셔요",
    scale: 0,
  },
];
