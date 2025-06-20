export interface GoogleMapsLocation {
  lat: number;
  lng: number;
}

export interface GoogleMapsStep {
  start_location: GoogleMapsLocation;
  end_location: GoogleMapsLocation;
  polyline?: {
    points: string;
  };
  distance?: {
    text: string;
    value: number;
  };
  duration?: {
    text: string;
    value: number;
  };
}

export interface GoogleMapsLeg {
  start_location: GoogleMapsLocation;
  end_location: GoogleMapsLocation;
  steps: GoogleMapsStep[];
  distance?: {
    text: string;
    value: number;
  };
  duration?: {
    text: string;
    value: number;
  };
}

export interface GoogleMapsRoute {
  legs: GoogleMapsLeg[];
  overview_polyline?: {
    points: string;
  };
  summary?: string;
  warnings?: string[];
  waypoint_order?: number[];
}

export interface GeocodedWaypoint {
  geocoder_status: string;
  place_id?: string;
  types?: string[];
}

export interface GoogleMapsDirectionsResponse {
  routes: GoogleMapsRoute[];
  status: string;
  geocoded_waypoints?: GeocodedWaypoint[];
  available_travel_modes?: string[];
  error_message?: string;
}

import {
  TravelMode,
  TravelRestriction,
  Language,
  LatLng,
} from '@googlemaps/google-maps-services-js';

export interface GoogleMapsDirectionsParams {
  origin: string;
  destination: string;
  key: string;
  mode?: TravelMode;
  language?: Language;
  region?: string;
  waypoints?: (string | LatLng)[];
  avoid?: TravelRestriction[];
  alternatives?: boolean;
}

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteSafetyInfo {
  safetyScore: number;
  dangerousMarkersNearRoute: number;
  safetyMarkersNearRoute: number;
}

export interface GoogleMapsApiError {
  response?: {
    status: number;
    statusText: string;
    data?: {
      error_message?: string;
      status?: string;
    };
  };
  message?: string;
}
