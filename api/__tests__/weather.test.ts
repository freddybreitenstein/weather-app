import forecastMock from "@/__fixtures__/forecastMock.json";
import openWeatherClient from "@/api/openWeatherClient";
import { groupForecastbyDate } from "@/utils/utils";
import { fetchCurrentWeather, fetchForecast } from "../weather";

jest.mock("@/api/openWeatherClient");

describe("fetchCurrentWeather", () => {
  const mockResponse = {
    data: {
      coord: { lat: 60.1695, lon: 24.9354 },
      weather: [{ description: "clear sky" }],
      main: { temp: 10 },
    },
  };

  it("fetches and returns current weather data", async () => {
    (openWeatherClient.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchCurrentWeather({
      lat: 60.1695,
      lon: 24.9354,
      units: "metric",
    });

    expect(openWeatherClient.get).toHaveBeenCalledWith("weather", {
      params: { lat: 60.1695, lon: 24.9354, units: "metric" },
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("throws an error if the API call fails", async () => {
    (openWeatherClient.get as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    await expect(
      fetchCurrentWeather({ lat: 60.1, lon: 24.9, units: "metric" })
    ).rejects.toThrow("Failed to fetch current weather");
  });
});

describe("fetchForecast", () => {
  it("fetches forecast and returns grouped data", async () => {
    (openWeatherClient.get as jest.Mock).mockResolvedValueOnce({
      data: forecastMock,
    });

    const result = await fetchForecast({
      lat: 60.1695,
      lon: 24.9354,
      units: "metric",
    });

    const grouped = groupForecastbyDate(forecastMock.list);

    expect(openWeatherClient.get).toHaveBeenCalledWith("forecast", {
      params: { lat: 60.1695, lon: 24.9354, units: "metric" },
    });

    expect(result).toEqual(grouped);
  });

  it("throws an error if the forecast API call fails", async () => {
    (openWeatherClient.get as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    await expect(
      fetchForecast({ lat: 60.1, lon: 24.9, units: "metric" })
    ).rejects.toThrow("Failed to fetch forecast data");
  });
});
