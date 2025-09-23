export interface ProductFilter {
  search: string;
  category: string;
  priceMin: number | null;
  priceMax: number | null;
}