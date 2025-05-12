import forecastMock from "@/__fixtures__/forecastMock.json";
import { ForecastItem } from "@/types/weatherTypes";
import {
  getUnitsLabels,
  groupForecastbyDate,
  roundTemperature,
} from "@/utils/utils";

describe("roundTemperature", () => {
  it("rounds temperature correctly", () => {
    expect(roundTemperature(21.6)).toBe(22);
    expect(roundTemperature(21.4)).toBe(21);
    expect(roundTemperature(-2.7)).toBe(-3);
  });
});

describe("getUnitsLabels", () => {
  it("returns correct labels for metric", () => {
    expect(getUnitsLabels("metric")).toEqual({
      tempLabel: "°C",
      windSpeedLabel: "m/s",
    });
  });

  it("returns correct labels for imperial", () => {
    expect(getUnitsLabels("imperial")).toEqual({
      tempLabel: "°F",
      windSpeedLabel: "mph",
    });
  });

  it("returns correct labels for standard", () => {
    expect(getUnitsLabels("standard")).toEqual({
      tempLabel: "K",
      windSpeedLabel: "m/s",
    });
  });
});

describe("groupForecastbyDate with real data", () => {
  it("groups forecast items into daily summaries", () => {
    const forecastItems = forecastMock.list as ForecastItem[];
    const result = groupForecastbyDate(forecastItems);

    expect(result.length).toBeGreaterThan(1); // Should span multiple days
    result.forEach((day) => {
      expect(day).toHaveProperty("date");
      expect(day).toHaveProperty("minTemp");
      expect(day).toHaveProperty("maxTemp");
      expect(day).toHaveProperty("description");
      expect(day).toHaveProperty("icon");
    });
  });
});
