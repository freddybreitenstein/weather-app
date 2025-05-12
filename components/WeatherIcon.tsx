import React from "react";
import { Image, ImageProps } from "react-native";

type WeatherIconProps = {
  icon?: string;
  size?: "default" | "small" | "large"; // You can extend this later
} & Omit<ImageProps, "source" | "style">;

const sizeMap = {
  large: 150,
  default: 50,
  small: 24,
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  icon,
  size = "default",
  ...rest
}) => {
  const iconSize = sizeMap[size];

  return (
    <Image
      source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
      style={{ width: iconSize, height: iconSize }}
      {...rest}
    />
  );
};

export default WeatherIcon;
