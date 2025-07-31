"use client";

import React from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { Paper, Alert, Text, Button, Group } from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

interface DashboardErrorBoundaryProps {
  children: React.ReactNode;
  sectionName: string;
  fallback?: React.ReactNode;
  onRetry?: () => void;
}

export const DashboardErrorBoundary: React.FC<DashboardErrorBoundaryProps> = ({
  children,
  sectionName,
  fallback,
  onRetry,
}) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error for monitoring/debugging
    console.error(`Dashboard section "${sectionName}" error:`, error, errorInfo);
    
    // You can also send to error reporting service here
    // Example: Sentry.captureException(error);
  };

  const defaultFallback = (
    <Paper shadow="xs" radius="lg" p="md" withBorder>
      <Alert
        icon={<IconAlertCircle size={16} />}
        title={`${sectionName} Error`}
        color="red"
        variant="light"
      >
        <Text size="sm" mb="md">
          Unable to load {sectionName.toLowerCase()}. This section encountered an error, but other parts of your dashboard continue to work normally.
        </Text>
        <Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            size="xs"
            variant="light"
            onClick={onRetry}
          >
            Retry
          </Button>
          <Text size="xs" c="dimmed">
            Error logged for debugging
          </Text>
        </Group>
      </Alert>
    </Paper>
  );

  return (
    <ErrorBoundary
      sectionName={sectionName}
      fallback={fallback || defaultFallback}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};

// Hook for dashboard components that need to handle async errors
export const useDashboardError = (sectionName: string) => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    console.error(`Dashboard section "${sectionName}" error:`, error);
    setError(error);
  }, [sectionName]);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};