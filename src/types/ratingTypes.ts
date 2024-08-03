export enum STAR_RATING {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export interface RatingCounts {
  [STAR_RATING.ONE]: number;
  [STAR_RATING.TWO]: number;
  [STAR_RATING.THREE]: number;
  [STAR_RATING.FOUR]: number;
  [STAR_RATING.FIVE]: number;
}
