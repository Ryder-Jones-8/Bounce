export interface SearchOptions {
  location: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
}

export interface Listing {
  name: string;
  lat: number;
  lon: number;
  price?: number;
  [key: string]: unknown;
}

export interface Provider {
  search(options: SearchOptions): Promise<Listing[]>;
}
