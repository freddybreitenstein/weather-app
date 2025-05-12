import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, ViewProps } from "react-native";

type ThemedDividerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  thickness?: number;
  inset?: number;
  outset?: number;
};

export function ThemedDivider({
  style,
  lightColor,
  darkColor,
  thickness = StyleSheet.hairlineWidth,
  inset = 10,
  outset = 10,
  ...otherProps
}: ThemedDividerProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "divider"
  );

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor,
          marginLeft: inset,
          marginRight: outset,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
