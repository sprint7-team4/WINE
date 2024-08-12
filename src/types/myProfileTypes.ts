// myProfileTypes.ts

import { REVIEW_MODE } from "./reviewTypes";

export interface User {
  id: number;
  nickname: string;
  image: string | null;
}

export interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  wine: Wine;
}

export interface ReviewsResponse {
  list: Review[];
  totalCount: number;
  nextCursor: string | null;
}

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: Review;
  userId: number;
}

export interface WinesResponse {
  totalCount: number;
  nextCursor: string | null;
  list: Wine[];
}

export interface ProfileData {
  id: number;
  nickname: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}
