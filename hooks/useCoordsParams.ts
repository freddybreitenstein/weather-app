import { useLocalSearchParams } from "expo-router";

export function useCoordsParams() {
  const params = useLocalSearchParams();

  const rawLat = params.lat;
  const rawLon = params.lon;

  const lat = typeof rawLat === "string" ? parseFloat(rawLat) : NaN;
  const lon = typeof rawLon === "string" ? parseFloat(rawLon) : NaN;

  const isValidLat = !isNaN(lat) && lat >= -90 && lat <= 90;
  const isValidLon = !isNaN(lon) && lon >= -180 && lon <= 180;

  if (!isValidLat || !isValidLon) {
    throw new Error(
      `Invalid or missing coordinates: lat=${rawLat}, lon=${rawLon}`
    );
  }

  return { lat, lon };
}
