export interface Recipe {
  id: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  imagePrompt: string;
  imageUrl?: string;
}

// FIX: Added BadgeType enum to be used in Badge.tsx
export enum BadgeType {
  VEGAN = 'VEGAN',
  LOW_SUGAR = 'LOW_SUGAR',
  DAIRY_FREE = 'DAIRY_FREE',
  ICED = 'ICED',
  HOT = 'HOT',
  ENERGY_BOOST = 'ENERGY_BOOST',
  PROTEIN = 'PROTEIN',
}

// FIX: Added View enum to be used in LandingPage.tsx
export enum View {
  LANDING,
  BUZZBOARD,
  MY_BREWS,
}
