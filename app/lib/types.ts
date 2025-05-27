export interface CatalogItem {
  id: string;
  name: string;
  image?: string;
  location?: string;
  price: number;
  coords: [number, number]; // [lon, lat]
}

export interface FiltersResponse {
  types: string[];
  features: string[];
  seasons: string[];
  price_range: { min: number; max: number };
}

export interface RegionsResponse {
  [key: string]: string[];
}