import { ApisauceInstance } from 'apisauce';

import { client } from './createApiClient';
import { OPEN_METEO_URL } from './endpoints';

export class OpenMeteoService {
  private static api: ApisauceInstance = client;
  private static url: string = OPEN_METEO_URL;

  private constructor() {}

  static async getWeather({ lon, lat }: { lon: string; lat: string }) {
    return this.api.get(
      this.url +
        `forecast?lon=${lon}&lat=${lat}&hourly=temperature_2m&daily=temperature_2m_max&current_weather=true&timezone=auto`,
      {}
    );
  }
}
