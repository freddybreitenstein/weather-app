import { CurrentWeather } from "@/types/weatherTypes";
import { roundTemperature } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useUnitsLabel } from "@/hooks/useUnitsLabel";
import WeatherIcon from "./WeatherIcon";

export default function CurrentWeatherView({ data }: { data: CurrentWeather }) {
  const { t } = useTranslation();
  const { tempLabel, windSpeedLabel } = useUnitsLabel();
  const surface = useThemeColor({}, "surface");

  const weatherDescription = data.weather[0];
  const feelsLike = roundTemperature(data.main.feels_like);
  const temperatureLabel = roundTemperature(data.main.temp) + tempLabel;

  return (
    <View style={{ borderRadius: 8, backgroundColor: surface }}>
      <View style={styles.mainContainer}>
        <WeatherIcon size="large" icon={weatherDescription?.icon} />
        <View style={styles.temperatureContainer}>
          <ThemedText type="default" style={{ textTransform: "capitalize" }}>
            {weatherDescription?.description}
          </ThemedText>
          <ThemedText type="largeTitle">{temperatureLabel}</ThemedText>
          <View>
            <ThemedText type="default">
              {t("feels_like")}: {feelsLike}
              {tempLabel}
            </ThemedText>
            <ThemedText type="default">
              {t("humidity")}: {data.main.humidity}%
            </ThemedText>
            <ThemedText type="default">
              {t("wind")}: {data.wind.speed} {windSpeedLabel}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  temperatureContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
