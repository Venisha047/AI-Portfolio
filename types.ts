
export interface GroundingSource {
  uri: string;
  title: string;
}

export interface Recipe {
  id: string;
  title:string;
  description: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  imagePrompt: string;
  imageUrl?: string;
  prepTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  flavorProfile?: string;
  brewingTips?: string[];
  sources?: GroundingSource[];
  originStory?: string;
  calories?: string;
  protein?: string;
  sugar?: string;
  fat?: string;
}

export enum BadgeType {
  VEGAN = 'VEGAN',
  LOW_SUGAR = 'LOW_SUGAR',
  DAIRY_FREE = 'DAIRY_FREE',
  ICED = 'ICED',
  HOT = 'HOT',
  ENERGY_BOOST = 'ENERGY_BOOST',
  PROTEIN = 'PROTEIN',
}