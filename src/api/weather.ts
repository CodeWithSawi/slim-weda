import { API_CONFIG } from "./config";
import type {
  Coordinates,
  CurrentWeatherResponse,
  ForecastResponse,
  ReverseGeocodeResponse,
} from "./type";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Weather API Error: ${response.statusText}`);
    return response.json();
  }
  async getCurrentWeather({
    lat,
    lon,
  }: Coordinates): Promise<CurrentWeatherResponse> {
    const URL = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });
    return this.fetchData<CurrentWeatherResponse>(URL);
  }
  async getForecast({ lat, lon }: Coordinates): Promise<ForecastResponse> {
    const URL = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    });

    return this.fetchData<ForecastResponse>(URL);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<ReverseGeocodeResponse> {
    const URL = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return this.fetchData<ReverseGeocodeResponse>(URL);
  }
}

export const weatherAPI = new WeatherAPI();
