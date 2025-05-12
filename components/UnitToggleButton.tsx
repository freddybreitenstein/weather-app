import { RootState } from "@/store";
import { toggleUnit } from "@/store/settingsSlice";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "./ThemedText";

const UnitToggleButton = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.settings.units);

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <Pressable onPress={handleToggle} style={{ paddingRight: 16 }}>
      <ThemedText type="subtitle">{unit === "metric" ? "°C" : "°F"}</ThemedText>
    </Pressable>
  );
};

export default UnitToggleButton;
