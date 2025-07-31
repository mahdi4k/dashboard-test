'use client';

import { ReactNode, Suspense, useEffect, useState } from 'react';
import { Card, Loader, Stack, Text } from '@mantine/core';
import { ErrorBoundary } from './ErrorBoundary';

interface AsyncDashboardSectionProps {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
  withCard?: boolean;
  cardProps?: any;
  dataFetcher?: () => Promise<any>;
  onError?: (error: Error) => void;
}

const LoadingFallback = ({ sectionName }: { sectionName: string }) => (
  <Card withBorder style={{ minHeight: '200px' }}>
    <Stack align="center" justify="center" style={{ minHeight: '150px' }}>
      <Loader size="md" />
      <Text size="sm" c="dimmed">
        Loading {sectionName}...
      </Text>
    </Stack>
  </Card>
);

function AsyncWrapper({ 
  children, 
  dataFetcher, 
  onError, 
  sectionName 
}: { 
  children: ReactNode; 
  dataFetcher?: () => Promise<any>; 
  onError?: (error: Error) => void;
  sectionName: string;
}) {
  const [loading, setLoading] = useState(!!dataFetcher);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (dataFetcher) {
      dataFetcher()
        .then(() => setLoading(false))
        .catch((err) => {
          setError(err);
          setLoading(false);
          onError?.(err);
          // Throw error to be caught by ErrorBoundary
          throw err;
        });
    }
  }, [dataFetcher, onError]);

  if (loading) {
    return <LoadingFallback sectionName={sectionName} />;
  }

  if (error) {
    throw error;
  }

  return <>{children}</>;
}

export function AsyncDashboardSection({
  children,
  sectionName,
  fallback,
  withCard = true,
  cardProps = {},
  dataFetcher,
  onError,
}: AsyncDashboardSectionProps) {
  const content = (
    <ErrorBoundary sectionName={sectionName} fallback={fallback}>
      <Suspense fallback={<LoadingFallback sectionName={sectionName} />}>
        <AsyncWrapper 
          dataFetcher={dataFetcher} 
          onError={onError}
          sectionName={sectionName}
        >
          {children}
        </AsyncWrapper>
      </Suspense>
    </ErrorBoundary>
  );

  if (!withCard) {
    return content;
  }

  return (
    <Card withBorder {...cardProps}>
      {content}
    </Card>
  );
}

// Example usage hook for API calls
export function useApiCall<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    setLoading(true);
    setError(null);
    
    apiCall()
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
          // Don't throw here, let the component handle it
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  // Throw error to trigger error boundary
  if (error) {
    throw error;
  }

  return { data, loading };
}