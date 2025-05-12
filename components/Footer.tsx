import { t } from "i18next";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Footer({ dataUpdatedAt }: { dataUpdatedAt: number }) {
  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString();

  return (
    <View style={styles.footer}>
      <ThemedText type="small">
        {t("lastUpdated")}: {lastUpdated}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
});
