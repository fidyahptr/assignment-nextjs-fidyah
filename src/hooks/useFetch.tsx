import { useState } from "react";

export interface UseFetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | unknown;
  totalData: number | null;
  setData: React.Dispatch<T | null>;
  fetchData: (
    endpoint: string,
    options: RequestInit | undefined
  ) => Promise<void>;
}

const useFetch = <T,>(): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [totalData, setTotalData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null | unknown>(null);

  const fetchData = async (
    endpoint: string,
    options: RequestInit | undefined
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/${endpoint}`,
        options
      );

      if (!response.ok) {
        throw new Error(
          `Failed to feth data: ${response.status} ${response.statusText}`
        ).message;
      }

      const result = await response.json();
      setData(result);
      setTotalData(Number(response.headers.get("X-Total-Count")));
    } catch (error: unknown) {
      setError(error || "An error occured while fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, totalData, setData, fetchData };
};

export default useFetch;
