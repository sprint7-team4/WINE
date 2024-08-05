export enum EN_AROMAS {
  CHERRY = "CHERRY",
  BERRY = "BERRY",
  OAK = "OAK",
  VANILLA = "VANILLA",
  PEPPER = "PEPPER",
  BAKING = "BAKING",
  GRASS = "GRASS",
  APPLE = "APPLE",
  PEACH = "PEACH",
  CITRUS = "CITRUS",
  TROPICAL = "TROPICAL",
  MINERAL = "MINERAL",
  FLOWER = "FLOWER",
  TOBACCO = "TOBACCO",
  EARTH = "EARTH",
  CHOCOLATE = "CHOCOLATE",
  SPICE = "SPICE",
  CARAMEL = "CARAMEL",
  LEATHER = "LEATHER",
}

export const AROMA_TO_KR: Record<EN_AROMAS, string> = {
  [EN_AROMAS.CHERRY]: "체리",
  [EN_AROMAS.BERRY]: "베리",
  [EN_AROMAS.OAK]: "오크",
  [EN_AROMAS.VANILLA]: "바닐라",
  [EN_AROMAS.PEPPER]: "후추",
  [EN_AROMAS.BAKING]: "제빵",
  [EN_AROMAS.GRASS]: "풀",
  [EN_AROMAS.APPLE]: "사과",
  [EN_AROMAS.PEACH]: "복숭아",
  [EN_AROMAS.CITRUS]: "시트러스",
  [EN_AROMAS.TROPICAL]: "트로피컬",
  [EN_AROMAS.MINERAL]: "미네랄",
  [EN_AROMAS.FLOWER]: "꽃",
  [EN_AROMAS.TOBACCO]: "담뱃잎",
  [EN_AROMAS.EARTH]: "흙",
  [EN_AROMAS.CHOCOLATE]: "초콜릿",
  [EN_AROMAS.SPICE]: "스파이스",
  [EN_AROMAS.CARAMEL]: "카라멜",
  [EN_AROMAS.LEATHER]: "가죽",
} as const;

// 한글에서 영어로의 역매핑 객체
export const AROMA_TO_EN: Record<string, EN_AROMAS> = Object.entries(
  AROMA_TO_KR
).reduce(
  (acc, [english, korean]) => {
    acc[korean] = english as EN_AROMAS;
    return acc;
  },
  {} as Record<string, EN_AROMAS>
);

// 영어와 한글의 키 목록을 배열로 제공
export const EN_AROMA_KEYS = Object.values(EN_AROMAS);
export const KR_AROMA_KEYS = Object.values(AROMA_TO_KR);
