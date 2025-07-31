'use client';

import { useCallback } from 'react';

export function useAsyncError() {
  const [, setError] = useCallback(() => {
    throw new Error();
  }, []) as [never, () => never];

  return setError;
}

// Hook to wrap async operations and catch errors
export function useAsyncErrorHandler() {
  const throwError = useAsyncError();

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        console.error('Async error caught:', error);
        throwError();
        return null;
      }
    },
    [throwError]
  );

  return handleAsyncError;
}