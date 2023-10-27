/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

const useDataFetch = (url: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    } catch (error: any) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    setLoading(true);
    setError("");
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useDataFetch;
