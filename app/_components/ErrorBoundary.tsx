"use client";

import React, { Component, ReactNode } from "react";
import { Alert, Box, Button, Paper, Text } from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper shadow="xs" radius="lg" p="md" withBorder>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={`${this.props.sectionName || "Component"} Error`}
            color="red"
            variant="light"
          >
            <Text size="sm" mb="md">
              Something went wrong with this section. The error has been logged and won't affect other parts of the dashboard.
            </Text>
            <Button
              leftSection={<IconRefresh size={16} />}
              size="xs"
              variant="light"
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
          </Alert>
        </Paper>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    console.error("Component error:", error);
    setError(error);
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

// Functional component wrapper for async operations
export const AsyncErrorBoundary: React.FC<{
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}> = ({ children, fallback, sectionName }) => {
  const { error, handleError, clearError } = useErrorHandler();

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Paper shadow="xs" radius="lg" p="md" withBorder>
        <Alert
          icon={<IconAlertCircle size={16} />}
          title={`${sectionName || "Component"} Error`}
          color="red"
          variant="light"
        >
          <Text size="sm" mb="md">
            Something went wrong with this section. The error has been logged and won't affect other parts of the dashboard.
          </Text>
          <Button
            leftSection={<IconRefresh size={16} />}
            size="xs"
            variant="light"
            onClick={clearError}
          >
            Try Again
          </Button>
        </Alert>
      </Paper>
    );
  }

  return (
    <ErrorBoundary sectionName={sectionName} onError={handleError}>
      {children}
    </ErrorBoundary>
  );
};