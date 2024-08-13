// myProfileTypes.ts

import { REVIEW_MODE } from "./reviewTypes";
import { RecentReview } from "./wineTypes";

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

export interface feachWine {
  avgRating: number;
  id: number;
  image: string;
  name: string;
  price: number;
  recentReview: {
    user: {
      image: string | null;
    };
  };
  region: string;
  reviewCount: number;
  type: "RED" | "WHITE" | "SPARKLING";
  userId: number;
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
  totalCount: number;
  type: "RED" | "WHITE" | "SPARKLING";
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
