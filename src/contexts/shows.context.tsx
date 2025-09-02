"use client";
import { showArrayParserHelpers } from "@/helpers/show-array-parser.helpers";
import useFetchShows from "@/hooks/use-fetch-shows.hooks";
import { show } from "@/types/show.types";
import { createContext, useEffect, useState } from "react";

// See the context has been two pieces: The actual storage itself

export const ShowContext = createContext<{
  shows: show[];
  loading: boolean;
  error: Error | null;
  searchQuery: string;
  setShows: React.Dispatch<React.SetStateAction<show[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}>({
  shows: [],
  loading: false,
  error: null,
  setShows: () => {},
  setLoading: () => {},
  setError: () => {},
  searchQuery: "",
  setSearchQuery: () => {}
});

export const ShowProvider = ({ children }: { children: React.ReactNode }) => {
  const [shows, setShows] = useState<show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { shows: fetchedShows, showLoading, errMessage } = useFetchShows();
  useEffect(() => {
    (() => {
      console.log("fetchedShows", fetchedShows);
      const parsed = fetchedShows.length !== 0 ? showArrayParserHelpers(fetchedShows) : [];
      console.log("Parsed shows", parsed);
      setShows(parsed);
    })();
  }, [fetchedShows]);
  useEffect(() => {
    if (errMessage) {
      setError(new Error(errMessage));
    }
  }, [errMessage]);

  useEffect(() => {
    setLoading(showLoading);
  }, [showLoading]);

  return (
    <ShowContext.Provider
      value={{ shows, loading, error, setShows, setLoading, setError, searchQuery, setSearchQuery }}
    >
      {children}
    </ShowContext.Provider>
  );
};
