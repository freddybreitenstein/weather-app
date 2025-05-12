export type Units = "standard" | "metric" | "imperial";

export type WeatherParams = { lat?: number; lon?: number; units?: Units };

export type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
  temp_kf?: number; // only present in forecast items
};

export type CurrentWeather = {
  coord: {
    lat: number;
    lon: number;
  };
  weather: WeatherDescription[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Forecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type ForecastItem = {
  dt: number;
  main: MainWeatherData;
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string; // day/night marker
  };
  dt_txt: string;
  rain?: {
    "3h": number;
  };
};

export type DailyForecast = {
  date: Date;
  description: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
};
