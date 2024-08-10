import { EN_AROMAS } from "@/constants/aroma";

export interface GetWinesParams {
  limit: number;
  cursor?: number;
  type?: "RED" | "WHITE" | "SPARKLING" | null;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface RecentReview {
  user: User;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: EN_AROMAS[];
  rating: number;
  id: number;
} // aroma 타입을 EN_AROMAS로 변경

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: RecentReview;
  userId: number;
}

export interface WineReview extends Wine {
  avgRatings: avgRatings;
  reviews: Review[];
}

export interface GetWinesResponse {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

// 리뷰 타입 추가
export interface Review {
  id: number;
  rating: number;
  aroma: EN_AROMAS[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  wineId: number;
}

// 별점 각 점수
export enum STAR_RATING_NUMBER {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

// avgRatings
export interface avgRatings {
  [STAR_RATING_NUMBER.ONE]: number;
  [STAR_RATING_NUMBER.TWO]: number;
  [STAR_RATING_NUMBER.THREE]: number;
  [STAR_RATING_NUMBER.FOUR]: number;
  [STAR_RATING_NUMBER.FIVE]: number;
}
