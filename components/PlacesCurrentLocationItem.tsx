import { useCurrentWeather } from "@/api/weather";
import { useAppState } from "@/hooks/useAppState";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useUnitsLabel } from "@/hooks/useUnitsLabel";
import { WeatherParams } from "@/types/weatherTypes";
import { roundTemperature } from "@/utils/utils";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import PlacesListItem from "./PlacesListItem";
import { ThemedText } from "./ThemedText";

export default function PlacesCurrentLocationItem() {
  const { t } = useTranslation();
  const { location, refreshLocation } = useCurrentLocation();
  const coords: WeatherParams = {
    lat: location?.coords.latitude,
    lon: location?.coords.longitude,
  };
  const surface = useThemeColor({}, "surface");
  const { data, isFetching } = useCurrentWeather(coords);
  const { tempLabel } = useUnitsLabel();

  const params = useMemo(() => {
    if (!data || isFetching) return null;

    return {
      name: data?.name || t("nameNotFound"),
      description: data?.weather?.[0]?.description ?? "",
      temperature: roundTemperature(data?.main.temp),
    };
  }, [data, isFetching, t]);

  // Check if location is available
  useAppState(() => {
    if (!location) {
      refreshLocation();
    }
  });

  const openLocationSettings = () => {
    Linking.openSettings().catch(() => {
      console.warn("Unable to open settings");
    });
  };

  if (location) {
    if (!params) return null;

    return (
      <PlacesListItem
        {...params}
        tempLabel={tempLabel}
        coords={coords}
        isCurrentLocation={true}
      />
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: surface }]}
      onPress={openLocationSettings}
    >
      <ThemedText>{t("enableLocation")}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
