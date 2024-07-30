export interface GetWinesParams {
  limit: number;
  cursor?: number;
  type?: 'RED' | 'WHITE' | 'SPARKLING';
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
  aroma: string[];
  rating: number;
  id: number;
}

export interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: RecentReview;
  userId: number;
}

export interface GetWinesResponse {
  totalCount: number;
  nextCursor: number;
  list: Wine[];
}
