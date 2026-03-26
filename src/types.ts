export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  time: number;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
}

export interface RecipeMetadata {
  slug: string;
  path: string;
  title: string | null;
  tags: string[] | null;
  time: number | null;
}
