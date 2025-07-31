# Next.js 15 Dashboard Error Boundary System

This guide explains how to use the error boundary system to handle errors gracefully in your Next.js 15 dashboard, ensuring that if one section fails, the entire dashboard doesn't crash.

## Overview

The error boundary system provides:
- **Isolated error handling**: Each dashboard section handles its own errors
- **Graceful degradation**: Failed sections show error states while others continue working
- **Retry functionality**: Users can retry failed sections
- **Custom fallbacks**: Custom error UI for different section types
- **Async error handling**: Proper handling of async operations and API calls

## Components

### 1. ErrorBoundary (`app/_components/ErrorBoundary.tsx`)

The main error boundary component that catches JavaScript errors in its child component tree.

```tsx
import { ErrorBoundary, DashboardSectionErrorBoundary } from './_components/ErrorBoundary';

// Basic usage
<ErrorBoundary sectionName="Chart">
  <YourChartComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary 
  sectionName="Chart" 
  fallback={<CustomErrorComponent />}
>
  <YourChartComponent />
</ErrorBoundary>
```

### 2. DashboardSection Wrappers (`app/_components/DashboardSection.tsx`)

Pre-configured wrappers for common dashboard section types:

```tsx
import { 
  ChartSection, 
  StatsSection, 
  TableSection, 
  CardSection 
} from './_components/DashboardSection';

// Usage
<ChartSection>
  <YourChartComponent />
</ChartSection>

<TableSection fallback={<CustomTableError />}>
  <YourTableComponent />
</TableSection>
```

### 3. Async Error Handling (`app/_components/useAsyncError.ts`)

Hook for handling async errors in components:

```tsx
import { useAsyncErrorHandler } from './_components/useAsyncError';

const MyComponent = () => {
  const handleAsyncError = useAsyncErrorHandler();

  const loadData = async () => {
    const result = await handleAsyncError(async () => {
      // Your async operation that might fail
      const data = await fetch('/api/data');
      return data.json();
    });
    
    if (result) {
      // Handle successful result
    }
  };
};
```

## Usage Examples

### Basic Implementation

```tsx
// app/page.tsx
import { 
  StatsSection, 
  ChartSection, 
  TableSection 
} from './_components/DashboardSection';

export default function Dashboard() {
  return (
    <div>
      <StatsSection>
        <Stats />
      </StatsSection>
      
      <ChartSection>
        <DebitChart />
      </ChartSection>
      
      <TableSection>
        <InvoiceTable />
      </TableSection>
    </div>
  );
}
```

### With Custom Fallbacks

```tsx
import { ChartFallback, TableFallback } from './_components/dashboard/CustomFallbacks';

<ChartSection fallback={<ChartFallback />}>
  <DebitChart />
</ChartSection>

<TableSection fallback={<TableFallback />}>
  <InvoiceTable />
</TableSection>
```

### Handling Async Errors

```tsx
// In your component
import { useAsyncErrorHandler } from '../useAsyncError';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleAsyncError = useAsyncErrorHandler();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await handleAsyncError(async () => {
          const response = await fetch('/api/chart-data');
          if (!response.ok) {
            throw new Error('Failed to fetch chart data');
          }
          return response.json();
        });
        
        if (result) {
          setData(result);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [handleAsyncError]);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {data.length > 0 && <Chart data={data} />}
    </div>
  );
};
```

## Custom Fallbacks

Create custom error UI for different section types:

```tsx
// Custom fallback component
export function CustomChartFallback() {
  return (
    <Card>
      <Stack align="center">
        <IconChartBar size={48} />
        <Text>Chart failed to load</Text>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Stack>
    </Card>
  );
}

// Usage
<ChartSection fallback={<CustomChartFallback />}>
  <YourChart />
</ChartSection>
```

## Error Boundary Features

### 1. Automatic Error Logging
Errors are automatically logged to the console with context about which section failed.

### 2. Retry Functionality
Each error boundary includes a retry button that resets the error state and re-renders the component.

### 3. Custom Error Messages
You can provide custom error messages and UI for different types of failures.

### 4. Section Isolation
Each section is isolated, so a failure in one section doesn't affect others.

## Best Practices

### 1. Wrap Each Dashboard Section
Always wrap your dashboard components with appropriate error boundaries:

```tsx
<StatsSection>
  <Stats />
</StatsSection>

<ChartSection>
  <Chart />
</ChartSection>
```

### 2. Use Custom Fallbacks for Better UX
Provide meaningful error messages and retry options:

```tsx
<ChartSection fallback={<ChartFallback />}>
  <Chart />
</ChartSection>
```

### 3. Handle Async Errors Properly
Use the `useAsyncErrorHandler` hook for API calls:

```tsx
const handleAsyncError = useAsyncErrorHandler();

const result = await handleAsyncError(async () => {
  return await fetchData();
});
```

### 4. Provide Loading States
Show loading indicators while data is being fetched:

```tsx
const [loading, setLoading] = useState(true);

// In your component
{loading && <LoadingSpinner />}
{!loading && data && <YourComponent data={data} />}
```

## Error Types Handled

The error boundary system handles:

1. **JavaScript Runtime Errors**: Syntax errors, undefined variables, etc.
2. **Async Operation Errors**: Failed API calls, network errors
3. **Component Rendering Errors**: Errors during component render
4. **Data Fetching Errors**: Failed data loading operations

## Testing Error Boundaries

To test your error boundaries, you can intentionally throw errors:

```tsx
// Test component that throws an error
const TestErrorComponent = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error('Test error');
  }
  
  return (
    <div>
      <button onClick={() => setShouldError(true)}>
        Trigger Error
      </button>
    </div>
  );
};
```

## Migration Guide

If you're migrating from a dashboard without error boundaries:

1. **Wrap existing components** with appropriate section wrappers
2. **Add async error handling** to components that make API calls
3. **Create custom fallbacks** for better user experience
4. **Test error scenarios** to ensure proper error handling

This system ensures your Next.js 15 dashboard remains robust and user-friendly even when individual sections encounter errors.