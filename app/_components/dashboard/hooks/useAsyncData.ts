"use client";

import { useState, useEffect, useCallback } from "react";
import { handleApiError, retryWithBackoff } from "../utils/apiErrorHandler";

interface UseAsyncDataOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
  autoRetry?: boolean;
}

interface UseAsyncDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  clearError: () => void;
}

export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    onSuccess,
    onError,
    retryCount = 3,
    retryDelay = 1000,
    autoRetry = true,
  } = options;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await retryWithBackoff(
        fetchFn,
        retryCount,
        retryDelay
      );

      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const apiError = handleApiError(err, "useAsyncData");
      setError(apiError);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, retryCount, retryDelay, onSuccess, onError]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch,
    clearError,
  };
}

// Specialized hook for dashboard components
export function useDashboardData<T>(
  sectionName: string,
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncDataOptions<T> = {}
): UseAsyncDataResult<T> {
  const enhancedOptions = {
    ...options,
    onError: (error: Error) => {
      console.error(`Dashboard section "${sectionName}" data error:`, error);
      options.onError?.(error);
    },
  };

  return useAsyncData(fetchFn, dependencies, enhancedOptions);
}