/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
// Extend UseMutationResult with isLoading
type CustomUseMutationResult<TData, TError, TVariables, TContext> =
  UseMutationResult<TData, TError, TVariables, TContext> & {
    isLoading: boolean;
  };
interface MutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> extends Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  > {
  method?: "POST" | "PUT" | "DELETE" | "PATCH";
  lang?: string;
  onSuccess?: (data: TData) => any; // Typing onSuccess
  onError?: (error: TError) => any; // Typing onError
}

export const useMutationData = <
  TData = any,
  TError = any,
  TVariables extends TData = any, // Ensure TVariables extends TData
  TContext = any
>(
  endpoint: string,
  options: MutationOptions<TData, TError, TVariables, TContext> = {}
): CustomUseMutationResult<TData, TError, TVariables, TContext> => {
  const dispatch = useDispatch();
  const [customLoading, setCustomLoading] = useState(false);

  // Define the mutationFn separately and pass it as part of the options
  const mutationFn = async (variables: TVariables): Promise<TData> => {
    const method = options.method || "POST";

    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage

    const config = {
      method,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      headers: {
        lang: options.lang || "ar",
        ...(accessToken && { authorization: `Bearer ${accessToken}` }), // Add Authorization header if token exists
      },
      data: variables,
    };

    const response = await axios(config);
    return response.data;
  };

  // Use the mutation hook, passing mutationFn as part of the options
  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn, // Pass the mutationFn here
    ...options, // Spread the other options (onSuccess, onError, etc.)
    onMutate: () => {
      // Set custom loading state to true when mutation starts
      setCustomLoading(true);
      // Return undefined explicitly to match the expected type
      return undefined;
    },
    onSettled: () => {
      // Set custom loading state to false when mutation settles (either success or error)
      setCustomLoading(false);
    },
  });

  useEffect(() => {
    if (options.onSuccess && mutation.isSuccess && mutation.data) {
      dispatch(options.onSuccess(mutation.data)); // Dispatching with the correct type
    }

    if (options.onError && mutation.isError && mutation.error) {
      dispatch(options.onError(mutation.error)); // Dispatching with the correct type
    }
  }, [
    options,
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    dispatch,
    options.onSuccess,
    options.onError,
  ]);

  return { ...mutation, isLoading: customLoading };
};
