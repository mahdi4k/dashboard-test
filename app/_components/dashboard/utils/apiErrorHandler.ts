export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  retryable?: boolean;
}

export class DashboardApiError extends Error {
  public status?: number;
  public code?: string;
  public retryable: boolean;

  constructor(message: string, status?: number, code?: string, retryable: boolean = true) {
    super(message);
    this.name = 'DashboardApiError';
    this.status = status;
    this.code = code;
    this.retryable = retryable;
  }
}

export const createApiError = (error: unknown): DashboardApiError => {
  if (error instanceof DashboardApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new DashboardApiError(error.message);
  }

  return new DashboardApiError('An unknown error occurred');
};

export const handleApiError = (error: unknown, context: string): DashboardApiError => {
  const apiError = createApiError(error);
  
  // Log error with context for debugging
  console.error(`API Error in ${context}:`, {
    message: apiError.message,
    status: apiError.status,
    code: apiError.code,
    retryable: apiError.retryable,
    stack: apiError.stack,
  });

  // You can add error reporting service here
  // Example: Sentry.captureException(apiError, { tags: { context } });

  return apiError;
};

export const isRetryableError = (error: unknown): boolean => {
  if (error instanceof DashboardApiError) {
    return error.retryable;
  }

  // Network errors are usually retryable
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // HTTP 5xx errors are retryable
  if (error instanceof Response && error.status >= 500) {
    return true;
  }

  return false;
};

export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries || !isRetryableError(error)) {
        throw lastError;
      }

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};