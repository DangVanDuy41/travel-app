import { Geocoding } from "./Geocoding";

export interface TripRequest {
  title: string;
  startDate: Date;
  endDate: Date;
  locationId: number;
}

export interface Trip {
  id: number;
  title: string;
  code: string;
  startDate: string;
  endDate: string;
  image: string;
  permission: string;
  location: Geocoding;
  timeVisit: number;
}

export interface Itinerary {
  id: number;
  note: string;
  day: Date;
  destinations: Destination[]
}
export interface Destination {
  id: number,
  location: Geocoding
}

export interface ShareTripType {
  email: string,
  tripPermission: string
}

