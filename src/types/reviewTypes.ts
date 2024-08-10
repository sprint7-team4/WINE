import { EN_AROMAS } from "@/constants/aroma";
import { Review } from "./wineTypes";

export interface WineBalance {
  drySweet: number;
  lightBold: number;
  smoothTannic: number;
  softAcidic: number;
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
