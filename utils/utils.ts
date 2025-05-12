import { DailyForecast, ForecastItem } from "@/types/weatherTypes";
import { format } from "date-fns";

export const roundTemperature = (temp: number) => {
  return Math.round(temp);
};

export const groupForecastbyDate = (items: ForecastItem[]): DailyForecast[] => {
  const dateStrings: Record<string, ForecastItem[]> = {};

  items.forEach((item) => {
    const dateString = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!dateStrings[dateString]) {
      dateStrings[dateString] = [];
    }
    dateStrings[dateString].push(item);
  });

  return Object.keys(dateStrings).map((dateString) => {
    const dateItems = dateStrings[dateString];

    const temps = dateItems.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // Count weather condition occurrences
    const conditionCount: Record<string, { count: number; icon: string }> = {};
    dateItems.forEach((item) => {
      const { description, icon } = item.weather[0];
      if (!conditionCount[description]) {
        conditionCount[description] = { count: 0, icon };
      }
      conditionCount[description].count++;
    });

    // Find the most frequent description
    const mostCommon = Object.entries(conditionCount).reduce((a, b) =>
      b[1].count > a[1].count ? b : a
    );

    return {
      date: new Date(dateString),
      minTemp,
      maxTemp,
      description: mostCommon[0],
      icon: mostCommon[1].icon,
    };
  });
};

export const getUnitsLabels = (unit: "metric" | "imperial" | "standard") => {
  switch (unit) {
    case "metric":
      return {
        tempLabel: "°C",
        windSpeedLabel: "m/s",
      };
    case "imperial":
      return {
        tempLabel: "°F",
        windSpeedLabel: "mph",
      };
    case "standard":
      return {
        tempLabel: "K",
        windSpeedLabel: "m/s",
      };
  }
};
