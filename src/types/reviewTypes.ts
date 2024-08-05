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

export interface ReviewFormProps {
  mode: "create" | "edit";
  review?: Review;
  onSubmit: (review: Review) => void;
  onCancel: () => void;
}
