import { useBatchCurrentWeather } from "@/api/weather";
import { useUnitsLabel } from "@/hooks/useUnitsLabel";
import { RootState } from "@/store";
import { SearchItem } from "@/store/recentSearchesSlice";
import { roundTemperature } from "@/utils/utils";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, FlatListProps, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PlacesListItem from "./PlacesListItem";

type ListItem = {
  name: string;
  description: string;
  temperature: number;
  tempLabel: string;
  coords: SearchItem;
  isCurrentLocation?: boolean;
};

type Props = Partial<FlatListProps<ListItem>>;

export default function PalacesList(props: Props) {
  const { t } = useTranslation();
  const recentSearches = useSelector(
    (state: RootState) => state.recentSearches
  );
  const { tempLabel } = useUnitsLabel();
  const weatherQueries = useBatchCurrentWeather(recentSearches);

  const itemsWithData = useMemo(() => {
    return weatherQueries
      .map((query, index) => {
        const data = query.data;
        if (!data || query.isFetching) return null;

        return {
          name: data.name || t("nameNotFound"),
          description: data.weather?.[0]?.description ?? "",
          temperature: roundTemperature(data.main.temp),
          tempLabel,
          coords: recentSearches[index],
        };
      })
      .filter((item) => item !== null);
  }, [weatherQueries, t, tempLabel, recentSearches]);

  return (
    <FlatList
      data={itemsWithData}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <PlacesListItem {...item} />}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
});
