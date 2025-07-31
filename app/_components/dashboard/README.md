# Dashboard Error Boundary System

This system provides robust error handling for dashboard sections, ensuring that if one section fails, the rest of the dashboard continues to work normally.

## Components Overview

### 1. ErrorBoundary
The core error boundary component that catches JavaScript errors in child components.

### 2. DashboardSection
A wrapper component that combines error boundaries with loading states and consistent styling.

### 3. AsyncDashboardSection
An enhanced version that handles async data fetching with proper error boundaries.

### 4. ErrorFallbacks
Specialized error UI components for different types of dashboard sections.

### 5. ErrorSimulator (Development Only)
A testing component that helps simulate errors during development.

## Basic Usage

```tsx
import { DashboardSection } from './_components/dashboard/DashboardSection';
import { ChartErrorFallback } from './_components/dashboard/ErrorFallbacks';

function MyDashboard() {
  return (
    <DashboardSection 
      sectionName="Sales Chart"
      fallback={<ChartErrorFallback sectionName="Sales Chart" />}
    >
      <SalesChart />
    </DashboardSection>
  );
}
```

## Advanced Usage with Async Data

```tsx
import { AsyncDashboardSection, useApiCall } from './_components/dashboard/AsyncDashboardSection';
import { TableErrorFallback } from './_components/dashboard/ErrorFallbacks';

function MyTable() {
  const { data, loading } = useApiCall(
    () => fetch('/api/table-data').then(res => res.json()),
    []
  );

  if (loading) return <div>Loading...</div>;

  return <TableComponent data={data} />;
}

function MyDashboard() {
  return (
    <AsyncDashboardSection
      sectionName="Data Table"
      fallback={<TableErrorFallback sectionName="Data Table" />}
    >
      <MyTable />
    </AsyncDashboardSection>
  );
}
```

## Error Fallback Types

- **ChartErrorFallback**: For chart components
- **TableErrorFallback**: For data tables
- **StatsErrorFallback**: For statistics/metrics
- **CardErrorFallback**: For card-based components

## Development Testing

In development mode, you can test error boundaries using the ErrorSimulator:

```tsx
import { ErrorSimulator } from './_components/dashboard/ErrorSimulator';

function TestComponent() {
  return (
    <ErrorSimulator sectionName="Test Section" errorType="network">
      <MyComponent />
    </ErrorSimulator>
  );
}
```

## Benefits

1. **Isolation**: Errors in one section don't crash the entire dashboard
2. **User Experience**: Users see helpful error messages instead of blank screens
3. **Retry Functionality**: Built-in retry buttons for failed sections
4. **Development Tools**: Easy error simulation for testing
5. **Consistent UI**: Standardized error states across all sections

## Error Types Handled

- **Render Errors**: Component rendering failures
- **Async Errors**: API call failures
- **Network Errors**: Connection issues
- **Data Processing Errors**: Invalid data handling

## Best Practices

1. Always wrap dashboard sections with error boundaries
2. Use specific error fallbacks for different component types
3. Test error scenarios during development
4. Provide meaningful error messages to users
5. Include retry functionality where appropriate
6. Log errors for debugging (automatically handled)

## Integration with Existing Components

The system is designed to work with your existing components without modification. Simply wrap them with the appropriate dashboard section component.