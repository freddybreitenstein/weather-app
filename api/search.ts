import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import mockPlaces from "../assets/mock-places-api.json";

const fuse = new Fuse(mockPlaces, {
  keys: ["title"],
  threshold: 0.3,
});

export const fetchMockPlaces = async (query: string) => {
  if (!query || query.length < 2) return [];
  await new Promise((res) => setTimeout(res, 150)); // simulate latency
  return fuse
    .search(query)
    .slice(0, 20)
    .map((result) => result.item);
};

export const usePlaceAutocomplete = (query: string) =>
  useQuery({
    queryKey: ["places", query],
    queryFn: () => fetchMockPlaces(query),
    enabled: query.length >= 2, // only run when query is long enough
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
