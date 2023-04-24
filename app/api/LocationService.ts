import { ApisauceInstance } from 'apisauce';

import { client } from './createApiClient';
import { LOCATION_API_URL } from './endpoints';
import api_keys from '../../api.keys.json';

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

export interface LocationWeather {
  name: string;
  country: string;
  lat: number;
  lng: number;
}
