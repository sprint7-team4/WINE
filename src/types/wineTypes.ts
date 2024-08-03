import { EN_AROMAS } from "@/constants/aroma";

export interface GetWinesParams {
  limit: number;
  cursor?: number;
  type?: "RED" | "WHITE" | "SPARKLING";
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
  avgRatings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  reviewCount: number;
  recentReview?: RecentReview;
  userId: number;
  reviews: Review[];
}

export interface GetWinesResponse {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}

export interface Review {
  id: number;
  rating: number;
  aroma: EN_AROMAS[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
