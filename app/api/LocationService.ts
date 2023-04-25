import { ApisauceInstance } from 'apisauce';

import { WeatherData } from './WeatherService';
import { client } from './createApiClient';
import { LOCATION_API_URL } from './endpoints';

export class LocationService {
  private static api: ApisauceInstance = client;
  private static url: string = LOCATION_API_URL;

  private constructor() {}

  static async getLocations(text: string) {
    return this.api.get<LocationResponse>(this.url + `?city=${text}`, {});
  }
}

type LocationResponse = Location[];

export interface Location {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface LocationWeather extends Location {
  weather: WeatherData | null;
}
