import { useCurrentWeather, useForecast } from "@/api/weather";
import CurrentWeatherView from "@/components/CurrentWeatherView";
import Footer from "@/components/Footer";
import ForecastView from "@/components/ForecastView";
import { useCoordsParams } from "@/hooks/useCoordsParams";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

export default function Details() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const coords = useCoordsParams();

  const {
    data: currentWeatherData,
    isRefetching: isRefetchingCurrentWeather,
    refetch: refetchCurrentWeather,
    dataUpdatedAt,
  } = useCurrentWeather(coords);

  const {
    data: forecastData,
    isRefetching: isRefetchingForecast,
    refetch: refetchForecast,
  } = useForecast(coords);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentWeatherData?.name || t("nameNotFound"),
    });
  }, [navigation, currentWeatherData, t]);

  const isRefetching = isRefetchingCurrentWeather || isRefetchingForecast;

  const onRefresh = () => {
    refetchCurrentWeather();
    refetchForecast();
  };

  if (!currentWeatherData || !forecastData) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
    >
      <CurrentWeatherView data={currentWeatherData} />
      <ForecastView data={forecastData} />

      <Footer dataUpdatedAt={dataUpdatedAt} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
