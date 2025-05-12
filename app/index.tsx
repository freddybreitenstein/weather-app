import { SafeAreaView, StyleSheet, View } from "react-native";

import PlacesCurrentLocationItem from "@/components/PlacesCurrentLocationItem";
import PlacesList from "@/components/PlacesList";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import UnitToggleButton from "@/components/UnitToggleButton";
import { useNavigation } from "expo-router";
import { useCallback, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: t("search"),
    });
  });

  const renderListHeader = useCallback(
    () => (
      <View style={styles.listContainer}>
        <View style={styles.headerRow}>
          <ThemedText type="subtitle">{t("appTitle")}</ThemedText>
          <UnitToggleButton />
        </View>
        <SearchBar />
        <PlacesCurrentLocationItem />
      </View>
    ),
    [t]
  );

  return (
    <SafeAreaView style={styles.container}>
      <PlacesList ListHeaderComponent={renderListHeader} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  listContainer: {
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
