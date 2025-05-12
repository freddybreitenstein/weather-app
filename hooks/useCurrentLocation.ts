import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const refreshLocation = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      setLocation(null);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
    setErrorMsg(null);
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return { location, errorMsg, refreshLocation };
}
