import { RootState } from "@/store";
import {
  CurrentWeather,
  DailyForecast,
  Forecast,
  WeatherParams,
} from "@/types/weatherTypes";
import { groupForecastbyDate } from "@/utils/utils";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import openWeatherClient from "./openWeatherClient";

export const fetchCurrentWeather = async ({
  lat,
  lon,
  units,
}: WeatherParams): Promise<CurrentWeather> => {
  try {
    const response = await openWeatherClient.get("weather", {
      params: { lat, lon, units },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw new Error("Failed to fetch current weather");
  }
};

export const useCurrentWeather = ({ lat, lon }: WeatherParams) => {
  const units = useSelector((state: RootState) => state.settings.units);

  return useQuery<CurrentWeather>({
    queryKey: ["currentWeather", lat, lon, units],
    queryFn: () => fetchCurrentWeather({ lat, lon, units }),
    enabled: lat !== undefined && lon !== undefined,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};

export const useBatchCurrentWeather = (recentSearches: WeatherParams[]) => {
  const units = useSelector((state: RootState) => state.settings.units);

  return useQueries({
    queries: recentSearches.map((coords) => ({
      queryKey: ["currentWeather", coords.lat, coords.lon, units],
      queryFn: () => fetchCurrentWeather({ ...coords, units }),
      enabled: !!coords,
      staleTime: 5 * 60 * 1000, // cache for 5 min
    })),
  });
};

export const fetchForecast = async ({
  lat,
  lon,
  units,
}: WeatherParams): Promise<DailyForecast[]> => {
  try {
    const response = await openWeatherClient.get("forecast", {
      params: { lat, lon, units },
    });
    const forecast: Forecast = response.data;

    return groupForecastbyDate(forecast.list);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw new Error("Failed to fetch forecast data");
  }
};

export const useForecast = ({ lat, lon }: WeatherParams) => {
  const units = useSelector((state: RootState) => state.settings.units);

  return useQuery<DailyForecast[]>({
    queryKey: ["forecast", lat, lon, units],
    queryFn: () => fetchForecast({ lat, lon, units }),
    enabled: lat !== undefined && lon !== undefined,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
