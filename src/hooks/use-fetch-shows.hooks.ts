import getShows from "@/helpers/generators/get-shows.generators";
import { useEffect, useState } from "react";

export default function useFetchShows() {
  // 1. Have a state where I will save the shows data, and also the loading state and error message
  //2. Have a useEffect that actually fetches the data from the api.
  // 3. Then return the data

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [showsGenerator] = useState(() => getShows());
  const [hasMorePages, setHasMorePages] = useState(true); // I can use this to check if the pages still remain
  // might also need the nextpage function
  const loadNextPage = async () => {
    try {
      setLoading(true);
      const { value, done } = await showsGenerator.next();
      if (done) {
        setHasMorePages(false);
      } else {
        setShows(value);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrMessage(error.message);
      } else {
        setErrMessage(String(error));
      }
      setHasMorePages(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadNextPage();
  }, []);

  return {
    shows,
    showLoading: loading,
    errMessage,
    hasMorePages,
    loadNextPage,
  };
}
