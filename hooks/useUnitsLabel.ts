import { RootState } from "@/store";
import { getUnitsLabels } from "@/utils/utils";
import { useSelector } from "react-redux";

export function useUnitsLabel() {
  const units = useSelector((state: RootState) => state.settings.units);
  const unitsLabel = getUnitsLabels(units);

  return unitsLabel;
}
