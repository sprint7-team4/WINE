import { EN_AROMAS } from "@/constants/aroma";
import { RecentReview, Review } from "./wineTypes";

export enum WineBalanceEnum {
  DRY_SWEET = "drySweet",
  LIGHT_BOLD = "lightBold",
  SMOOTH_TANNIC = "smoothTannic",
  SOFT_ACIDIC = "softAcidic",
}

export interface WineBalance {
  [WineBalanceEnum.DRY_SWEET]: number;
  [WineBalanceEnum.LIGHT_BOLD]: number;
  [WineBalanceEnum.SMOOTH_TANNIC]: number;
  [WineBalanceEnum.SOFT_ACIDIC]: number;
}

export interface BalancedProfile {
  name: string;
  minimumText: string;
  maximumText: string;
  scale: number;
}

export enum REVIEW_MODE {
  REVIEW = "review",
  CREATE = "create",
  EDIT = "edit",
}

export interface ReviewFormProps {
  mode: REVIEW_MODE;
  review?: Review;
  wineId?: number;
}

export interface User {
  id: number;
  nickname: string;
  image: string;
}

export interface SendReview {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: EN_AROMAS[];
  content: string;
  wineId: number;
  updatedAt?: string;
  createdAt?: string;
  user?: User;
  teamId?: number;
  id?: number;
}

export enum ReviewFieldsEnum {
  RATING = "rating",
  AROMA = "aroma",
  LIGHT_BOLD = "lightBold",
  SMOOTH_TANNIC = "smoothTannic",
  DRY_SWEET = "drySweet",
  SOFT_ACIDIC = "softAcidic",
  CONTENT = "content",
  WINE_ID = "wineId",
}

export interface ReviewFields {
  [ReviewFieldsEnum.RATING]: number;
  [ReviewFieldsEnum.AROMA]: string;
  [ReviewFieldsEnum.LIGHT_BOLD]: number;
  [ReviewFieldsEnum.SMOOTH_TANNIC]: number;
  [ReviewFieldsEnum.DRY_SWEET]: number;
  [ReviewFieldsEnum.SOFT_ACIDIC]: number;
  [ReviewFieldsEnum.CONTENT]: string;
  [ReviewFieldsEnum.WINE_ID]: number;
}

export interface ProfileScales {
  [WineBalanceEnum.DRY_SWEET]: { scale: number };
  [WineBalanceEnum.LIGHT_BOLD]: { scale: number };
  [WineBalanceEnum.SMOOTH_TANNIC]: { scale: number };
  [WineBalanceEnum.SOFT_ACIDIC]: { scale: number };
}

export interface ReviewWine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: RecentReview;
  userId: number;
  reviews: Review[];
}
