'use client';

import { Alert, Button, Card, Group, Text, Stack, Skeleton } from '@mantine/core';
import { IconAlertCircle, IconRefresh, IconChartBar, IconTable, IconCreditCard } from '@tabler/icons-react';

// Custom fallback for chart sections
export function ChartFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <IconChartBar size={48} color="var(--mantine-color-blue-6)" />
        <Text size="lg" fw={600} ta="center">
          Chart Loading Failed
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load chart data. This might be due to network issues or server problems.
        </Text>
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="outline"
            onClick={onRetry}
          >
            Retry Loading
          </Button>
        )}
      </Stack>
    </Card>
  );
}

// Custom fallback for table sections
export function TableFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <IconTable size={48} color="var(--mantine-color-green-6)" />
        <Text size="lg" fw={600} ta="center">
          Table Loading Failed
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load table data. Please try again later.
        </Text>
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="outline"
            onClick={onRetry}
          >
            Retry Loading
          </Button>
        )}
      </Stack>
    </Card>
  );
}

// Custom fallback for card sections
export function CardFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" spacing="md">
        <IconCreditCard size={48} color="var(--mantine-color-orange-6)" />
        <Text size="lg" fw={600} ta="center">
          Card Loading Failed
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load card information. Please try again.
        </Text>
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="outline"
            onClick={onRetry}
          >
            Retry Loading
          </Button>
        )}
      </Stack>
    </Card>
  );
}

// Loading skeleton for chart
export function ChartSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton height={20} width="60%" mb="md" />
      <Skeleton height={300} mb="md" />
      <Group>
        <Skeleton height={16} width={80} />
        <Skeleton height={16} width={80} />
        <Skeleton height={16} width={80} />
      </Group>
    </Card>
  );
}

// Loading skeleton for table
export function TableSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton height={20} width="40%" mb="md" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={40} mb="xs" />
      ))}
    </Card>
  );
}

// Loading skeleton for stats
export function StatsSkeleton() {
  return (
    <Group>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height={80} width={200} />
      ))}
    </Group>
  );
}