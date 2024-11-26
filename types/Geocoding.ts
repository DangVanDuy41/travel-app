export interface Geocoding{
  place_id: number;
  category: string;
  display_name: string;
  lon: string;
  lat: string;
  name: string;
  address: Address;
  thumbnail: Thumbnail;
  boundingbox: string[];
  starRate: null;
  timeVisit: number;
  type: string;
}

interface Thumbnail {
  id: number;
  url: string;
  caption: string;
}

interface Address {
  housenumber: null;
  road: string;
  quarter: string;
  suburb: string;
  city: string;
  state: null;
  postcode: string;
  country_code: string;
  country: string;
}