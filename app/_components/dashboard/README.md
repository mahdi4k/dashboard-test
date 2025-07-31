# Dashboard Error Boundary System

This system provides comprehensive error handling for Next.js 15 dashboard components, ensuring that if one section fails, the entire dashboard continues to function.

## Features

- **Isolated Error Handling**: Each dashboard section is wrapped in an error boundary
- **Graceful Degradation**: Failed sections show user-friendly error messages
- **Retry Functionality**: Users can retry failed sections
- **Loading States**: Proper loading indicators during data fetching
- **API Error Handling**: Built-in retry logic with exponential backoff
- **Error Logging**: Automatic error logging for debugging

## Quick Start

### 1. Basic Usage

Wrap your dashboard components with `DashboardErrorBoundary`:

```tsx
import { DashboardErrorBoundary } from "./_components/dashboard/DashboardErrorBoundary";

export default function Dashboard() {
  return (
    <Stack>
      <DashboardErrorBoundary sectionName="Statistics">
        <Stats />
      </DashboardErrorBoundary>
      
      <DashboardErrorBoundary sectionName="Chart">
        <Chart />
      </DashboardErrorBoundary>
    </Stack>
  );
}
```

### 2. Using the Async Data Hook

For components that fetch data, use the `useDashboardData` hook:

```tsx
import { useDashboardData } from "./_components/dashboard/hooks/useAsyncData";

function MyComponent() {
  const { data, loading, error } = useDashboardData(
    "My Section",
    fetchMyData,
    [], // dependencies
    {
      retryCount: 3,
      retryDelay: 1000,
    }
  );

  if (error) {
    throw error; // Let error boundary handle it
  }

  if (loading) {
    return <Skeleton />;
  }

  return <div>{/* Your component */}</div>;
}
```

### 3. Custom Error Handling

For more control, use the `useDashboardError` hook:

```tsx
import { useDashboardError } from "./_components/dashboard/DashboardErrorBoundary";

function MyComponent() {
  const { error, handleError, clearError } = useDashboardError("My Section");

  const loadData = async () => {
    try {
      clearError();
      const data = await fetchData();
      // Handle success
    } catch (err) {
      handleError(err instanceof Error ? err : new Error("Unknown error"));
    }
  };

  if (error) {
    return null; // Let error boundary handle display
  }

  return <div>{/* Your component */}</div>;
}
```

## Error Boundary Components

### `DashboardErrorBoundary`

The main error boundary component for dashboard sections.

**Props:**
- `children`: React components to wrap
- `sectionName`: Name of the section (used in error messages)
- `fallback`: Custom error UI (optional)
- `onRetry`: Custom retry function (optional)

### `ErrorBoundary`

The base error boundary class component.

### `AsyncErrorBoundary`

A functional component wrapper for async operations.

## Hooks

### `useDashboardData<T>`

Hook for managing async data with built-in error handling.

**Parameters:**
- `sectionName`: Name of the section
- `fetchFn`: Function that returns a Promise
- `dependencies`: Array of dependencies for useEffect
- `options`: Configuration options

**Returns:**
- `data`: The fetched data
- `loading`: Loading state
- `error`: Error state
- `refetch`: Function to retry the fetch
- `clearError`: Function to clear the error

### `useDashboardError`

Hook for manual error handling in components.

**Returns:**
- `error`: Current error
- `handleError`: Function to set an error
- `clearError`: Function to clear the error

## API Error Handling

### `DashboardApiError`

Custom error class for API errors with additional context.

### `handleApiError`

Utility function to standardize error handling.

### `retryWithBackoff`

Utility function for retrying failed requests with exponential backoff.

## Best Practices

1. **Always wrap dashboard sections** with `DashboardErrorBoundary`
2. **Use descriptive section names** for better error messages
3. **Handle loading states** to improve user experience
4. **Throw errors in components** to let error boundaries handle them
5. **Use the async data hook** for components that fetch data
6. **Log errors appropriately** for debugging

## Example: Complete Component

```tsx
"use client";

import React from "react";
import { useDashboardData } from "./hooks/useAsyncData";
import { Skeleton, Paper, Text } from "@mantine/core";

const fetchData = async () => {
  const response = await fetch("/api/my-data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export function MyDashboardSection() {
  const { data, loading, error } = useDashboardData(
    "My Section",
    fetchData,
    [],
    { retryCount: 3 }
  );

  if (error) {
    throw error; // Let error boundary handle display
  }

  if (loading) {
    return (
      <Paper p="md">
        <Skeleton height={200} />
      </Paper>
    );
  }

  return (
    <Paper p="md">
      <Text>Data: {JSON.stringify(data)}</Text>
    </Paper>
  );
}
```

## Error Messages

The system provides user-friendly error messages that:
- Explain what went wrong
- Assure users that other parts work normally
- Provide retry functionality
- Log errors for debugging

## Monitoring

To add error monitoring (e.g., Sentry), modify the error handling in:
- `DashboardErrorBoundary.tsx`
- `apiErrorHandler.ts`

Example:
```tsx
import * as Sentry from "@sentry/nextjs";

// In handleError function
Sentry.captureException(error, { tags: { section: sectionName } });
```