import { useThemeColor } from "@/hooks/useThemeColor";
import { WeatherParams } from "@/types/weatherTypes";
import { useRouter } from "expo-router";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

function PlacesListItem({
  name,
  description,
  temperature,
  tempLabel,
  coords,
  isCurrentLocation = false,
}: {
  name: string;
  description: string;
  temperature: number;
  tempLabel: string;
  coords: WeatherParams;
  isCurrentLocation?: boolean;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const surface = useThemeColor({}, "surface");

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: surface }]}
      onPress={() => router.push({ pathname: "/details", params: coords })}
    >
      <View style={styles.titleContainer}>
        <View>
          <ThemedText type="subtitle">{name || t("nameNotFound")}</ThemedText>
          {isCurrentLocation && (
            <ThemedText type="small">{t("currentLocation")}</ThemedText>
          )}
        </View>
        <ThemedText type="default" style={styles.description}>
          {description}
        </ThemedText>
      </View>
      <View style={styles.temperatureContainer}>
        <ThemedText type="largeTitle">{temperature + tempLabel}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    height: 100,
    padding: 8,
  },
  titleContainer: {
    justifyContent: "space-between",
  },
  description: {
    textTransform: "capitalize",
  },
  temperatureContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default memo(PlacesListItem);
