import 'leaflet/dist/leaflet.css';

export interface CatalogItem {
  id: string;
  name: string;
  region: string;
  type: string;
  price: number;
  coords: {
    type: 'Point';
    coordinates: [number, number]; // [lon, lat]
  };
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
