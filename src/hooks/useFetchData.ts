/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  lang?: string;
  body?: any;
  cacheTime?: number;
  staleTime?: number;
  onSuccess?: (data: any) => any; // Action should return a plain object
  onError?: (error: any) => any; // Action should return a plain object
  onLoading?: () => any; // Action should return a plain object
}

export const useFetchData = <T>(
  endpoint: string,
  params: Record<string, any> = {},
  options: FetchOptions = {}
) => {
  const dispatch = useDispatch();

  const fetchData = async (): Promise<T> => {
    const method = options.method || "GET";

    const config = {
      method,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      headers: {
        lang: options.lang || "ar",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      ...(method === "GET" ? { params } : { data: options.body }),
    };

    const response = await axios(config);
    return response.data;
  };

  const query = useQuery<T>({
    queryKey: [
      "fetchData",
      endpoint,
      options.method || "GET",
      JSON.stringify(params),
      JSON.stringify(options.body),
    ],
    queryFn: fetchData,
    staleTime: options.staleTime || 300000,
  });

  useEffect(() => {
    if (options.onSuccess && query.data) {
      dispatch(options.onSuccess(query.data));
    }

    if (options.onError && query.error) {
      dispatch(options.onError(query.error));
    }

    if (options.onLoading && query.isLoading) {
      dispatch(options.onLoading());
    }
  }, [
    options,
    query.data,
    query.error,
    query.isLoading,
    dispatch,
    options.onSuccess,
    options.onError,
    options.onLoading,
  ]);

  return query;
};

