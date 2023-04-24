import { ApisauceInstance } from 'apisauce';

import { client } from './createApiClient';
import { REVERSE_GEOCODING_URL } from './endpoints';
import api_keys from '../../api.keys.json';

export class ReverseGeocodingService {
  private static api: ApisauceInstance = client;
  private static url: string = REVERSE_GEOCODING_URL;
  private static API_KEY: string = api_keys.REVERSE_GEOCODING_KEY;

  private constructor() {}

  static async getCityName({ latitude, longitude }: { latitude: number; longitude: number }) {
    return this.api.get<ReverseGeocodingResponse>(
      this.url + `?lat=${latitude}&lon=${longitude}`,
      {},
      {
        headers: {
          'X-Api-Key': ReverseGeocodingService.API_KEY,
        },
      }
    );
  }
}

type ReverseGeocodingResponse = ReverseGeocodingResponseItem[];

interface ReverseGeocodingResponseItem {
  name: string;
  country: string;
  state: string;
}
