'use client';

import React, { Component, ReactNode } from 'react';
import { Alert, Button, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard section error:', error, errorInfo);
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
        <Alert
          icon={<IconAlertTriangle size={16} />}
          title={`${this.props.sectionName || 'Section'} Error`}
          color="red"
          variant="light"
          style={{ minHeight: '200px' }}
        >
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Something went wrong loading this section. Other parts of your dashboard are still working.
            </Text>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Text size="xs" c="red" style={{ fontFamily: 'monospace' }}>
                {this.state.error.message}
              </Text>
            )}
            <Button
              leftSection={<IconRefresh size={16} />}
              variant="light"
              size="sm"
              onClick={this.handleRetry}
              style={{ alignSelf: 'flex-start' }}
            >
              Try Again
            </Button>
          </Stack>
        </Alert>
      );
    }

    return this.props.children;
  }
}