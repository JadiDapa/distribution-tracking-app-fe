import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};
