'use client';

import { useState } from 'react';
import { Button, Group, Stack, Text, Card, Switch } from '@mantine/core';
import { IconBug, IconRefresh } from '@tabler/icons-react';

interface ErrorSimulatorProps {
  sectionName: string;
  children: React.ReactNode;
  errorType?: 'render' | 'async' | 'network';
}

export function ErrorSimulator({ 
  sectionName, 
  children, 
  errorType = 'render' 
}: ErrorSimulatorProps) {
  const [shouldError, setShouldError] = useState(false);
  const [errorEnabled, setErrorEnabled] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  const triggerError = () => {
    setShouldError(true);
  };

  const resetError = () => {
    setShouldError(false);
  };

  // Simulate different types of errors
  if (shouldError && errorEnabled) {
    if (errorType === 'render') {
      throw new Error(`Simulated render error in ${sectionName}`);
    } else if (errorType === 'async') {
      // This would be caught by the error boundary when component tries to render
      throw new Error(`Simulated async error in ${sectionName}`);
    } else if (errorType === 'network') {
      throw new Error(`Simulated network error in ${sectionName} - API request failed`);
    }
  }

  return (
    <Stack gap="xs">
      <Card withBorder p="xs" style={{ backgroundColor: 'var(--mantine-color-yellow-0)' }}>
        <Group justify="space-between" align="center">
          <Text size="xs" fw={500}>Dev Tools - {sectionName}</Text>
          <Group gap="xs">
            <Switch
              size="xs"
              checked={errorEnabled}
              onChange={(event) => setErrorEnabled(event.currentTarget.checked)}
              label="Enable Error Simulation"
            />
            {errorEnabled && (
              <>
                <Button
                  size="xs"
                  variant="light"
                  color="red"
                  leftSection={<IconBug size={12} />}
                  onClick={triggerError}
                  disabled={shouldError}
                >
                  Trigger Error
                </Button>
                {shouldError && (
                  <Button
                    size="xs"
                    variant="light"
                    leftSection={<IconRefresh size={12} />}
                    onClick={resetError}
                  >
                    Reset
                  </Button>
                )}
              </>
            )}
          </Group>
        </Group>
      </Card>
      {children}
    </Stack>
  );
}

// Higher-order component for easy wrapping
export function withErrorSimulation<T extends object>(
  WrappedComponent: React.ComponentType<T>, 
  sectionName: string,
  errorType?: 'render' | 'async' | 'network'
) {
  return function ErrorSimulatedComponent(props: T) {
    return (
      <ErrorSimulator sectionName={sectionName} errorType={errorType}>
        <WrappedComponent {...props} />
      </ErrorSimulator>
    );
  };
}