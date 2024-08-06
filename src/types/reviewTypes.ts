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

export type ReviewMode = "review" | "create" | "edit";

export interface ReviewFormProps {
  mode: ReviewMode;
  review?: Review;
  onSubmit: (review: Review) => void;
  onCancel: () => void;
}
