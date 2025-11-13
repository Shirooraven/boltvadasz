export type StoreKey = 'tesco' | 'lidl';

export type NormalizedProduct = {
  store: StoreKey;
  productId: string;
  name: string;
  rawprice?: number;
  category?: string;
  categoryLabel?: string;
  unitPrice?: string | null;
  available?: boolean;
  clubcard?: boolean;
  qty?: number | null;
  qtyUnit?: 'g' | 'dkg' | 'kg' | 'l' | 'ml' | 'db' | null;
};

export type RecipeIngredient = {
  id?: string;
  baseName: string;
  store?: StoreKey;
  products?: Record<string, any> | NormalizedProduct[];
  amount?: number | null;
  unit?: string | null;
  note?: string | null;
  qty?: number | null;
  qtyUnit?: 'g' | 'dkg' | 'kg' | 'l' | 'ml' | 'db' | null;
};

export type RecipeRecord = {
  id: string;
  name: string;
  createdAt: number;
  ingredients: RecipeIngredient[];
};

export type PerUnit = 'kg' | 'g' | 'l' | 'ml' | 'db';

export type Scored = {
  p: NormalizedProduct;
  cost: number | null;
  usedQty: number | null;
  usedUnit: PerUnit | null;
};
