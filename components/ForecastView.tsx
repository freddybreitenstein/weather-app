import { useThemeColor } from "@/hooks/useThemeColor";
import { useUnitsLabel } from "@/hooks/useUnitsLabel";
import { DailyForecast } from "@/types/weatherTypes";
import { roundTemperature } from "@/utils/utils";
import { isToday } from "date-fns";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { ThemedDivider } from "./ThemedDivider";
import { ThemedText } from "./ThemedText";
import WeatherIcon from "./WeatherIcon";

const ForecastItem = ({ item }: { item: DailyForecast }) => {
  const { t } = useTranslation();
  const { date } = item;
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const { tempLabel } = useUnitsLabel();
  const minTemp = roundTemperature(item.minTemp);
  const maxTemp = roundTemperature(item.maxTemp);

  return (
    <View style={styles.row}>
      <View style={styles.header}>
        <ThemedText type="default">
          {isToday(date) ? t("today") : day}
        </ThemedText>
        <WeatherIcon size="small" icon={item.icon} />
      </View>

      <View>
        <ThemedText type="default" style={{ textTransform: "capitalize" }}>
          {item.description}
        </ThemedText>
      </View>
      <ThemedText type="default">
        {minTemp}
        {tempLabel} / {maxTemp}
        {tempLabel}
      </ThemedText>
    </View>
  );
};

export default function ForecastView({
  data,
}: {
  data: DailyForecast[] | undefined;
}) {
  const { t } = useTranslation();
  const surface = useThemeColor({}, "surface");

  return (
    <View
      style={{
        backgroundColor: surface,
        borderRadius: 8,
        padding: 8,
      }}
    >
      <ThemedText type="small" style={{ padding: 8 }}>
        {t("fiveDayForecast")}
      </ThemedText>
      <ThemedDivider />
      {data?.map((item, index) => (
        <View key={item.date.toString()}>
          <ForecastItem item={item} />
          {index < data.length - 1 && <ThemedDivider />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 85,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginTop: 8,
  },
});
