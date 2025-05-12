import reducer, { setUnit, toggleUnit } from "@/store/settingsSlice";

describe("settingsSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({ units: "metric" });
  });

  it("should set unit to imperial", () => {
    const state = reducer(undefined, setUnit("imperial"));
    expect(state.units).toBe("imperial");
  });

  it("should toggle from metric to imperial", () => {
    const state = reducer({ units: "metric" }, toggleUnit());
    expect(state.units).toBe("imperial");
  });

  it("should toggle from imperial to metric", () => {
    const state = reducer({ units: "imperial" }, toggleUnit());
    expect(state.units).toBe("metric");
  });
});
