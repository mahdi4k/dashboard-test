'use client';

import { ReactNode, Suspense } from 'react';
import { Card, Loader, Stack, Text } from '@mantine/core';
import { ErrorBoundary } from './ErrorBoundary';

interface DashboardSectionProps {
  children: ReactNode;
  sectionName: string;
  loading?: boolean;
  fallback?: ReactNode;
  withCard?: boolean;
  cardProps?: any;
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

export function DashboardSection({
  children,
  sectionName,
  loading = false,
  fallback,
  withCard = true,
  cardProps = {},
}: DashboardSectionProps) {
  const content = (
    <ErrorBoundary sectionName={sectionName} fallback={fallback}>
      <Suspense fallback={<LoadingFallback sectionName={sectionName} />}>
        {loading ? <LoadingFallback sectionName={sectionName} /> : children}
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