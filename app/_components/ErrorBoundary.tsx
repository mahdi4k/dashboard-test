'use client';

import { Component, ReactNode } from 'react';
import { Alert, Box, Button, Card, Group, Text } from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
  onError?: (error: Error, errorInfo: any) => void;
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

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
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
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={`${this.props.sectionName || 'Section'} Error`}
            color="red"
            variant="light"
          >
            <Text size="sm" mb="md">
              Something went wrong with this section. The error has been logged.
            </Text>
            <Group>
              <Button
                leftSection={<IconRefresh size={16} />}
                size="sm"
                variant="outline"
                onClick={this.handleRetry}
              >
                Retry
              </Button>
            </Group>
          </Alert>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Client-side error boundary wrapper for easier use
export function DashboardSectionErrorBoundary({
  children,
  sectionName,
  fallback,
}: {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
}) {
  return (
    <ErrorBoundary sectionName={sectionName} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}