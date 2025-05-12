import reducer, {
  addSearch,
  clearSearches,
  SearchItem,
} from "@/store/recentSearchesSlice";

describe("recentSearchesSlice", () => {
  const sampleSearch: SearchItem = {
    id: "1",
    title: "Helsinki",
    lat: 60.1695,
    lon: 24.9354,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual([]);
  });

  it("should add a new search to the beginning", () => {
    const state = reducer([], addSearch(sampleSearch));
    expect(state).toEqual([sampleSearch]);
  });

  it("should move existing item to the top if re-added", () => {
    const state = reducer(
      [sampleSearch, { id: "2", title: "Espoo", lat: 60.2, lon: 24.7 }],
      addSearch(sampleSearch)
    );
    expect(state[0]).toEqual(sampleSearch);
    expect(state).toHaveLength(2);
  });

  it("should clear all searches", () => {
    const state = reducer([sampleSearch], clearSearches());
    expect(state).toEqual([]);
  });
});
