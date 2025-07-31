'use client';

import { Alert, Button, Card, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { 
  IconChartBar, 
  IconTable, 
  IconChartLine, 
  IconCreditCard, 
  IconRefresh,
  IconAlertTriangle,
  IconTrendingUp
} from '@tabler/icons-react';

interface ErrorFallbackProps {
  onRetry?: () => void;
  error?: Error;
  sectionName?: string;
}

export function ChartErrorFallback({ onRetry, error, sectionName }: ErrorFallbackProps) {
  return (
    <Card withBorder style={{ minHeight: '300px' }}>
      <Stack align="center" justify="center" gap="md" style={{ minHeight: '250px' }}>
        <ThemeIcon size={60} variant="light" color="red">
          <IconChartLine size={30} />
        </ThemeIcon>
        <Text size="lg" fw={500}>Chart Unavailable</Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load {sectionName || 'chart'} data. Please try again later.
        </Text>
        {process.env.NODE_ENV === 'development' && error && (
          <Text size="xs" c="red" style={{ fontFamily: 'monospace' }} ta="center">
            {error.message}
          </Text>
        )}
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="light"
            onClick={onRetry}
          >
            Reload Chart
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export function TableErrorFallback({ onRetry, error, sectionName }: ErrorFallbackProps) {
  return (
    <Card withBorder style={{ minHeight: '400px' }}>
      <Stack align="center" justify="center" gap="md" style={{ minHeight: '350px' }}>
        <ThemeIcon size={60} variant="light" color="red">
          <IconTable size={30} />
        </ThemeIcon>
        <Text size="lg" fw={500}>Table Data Unavailable</Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load {sectionName || 'table'} data. Other sections continue to work normally.
        </Text>
        {process.env.NODE_ENV === 'development' && error && (
          <Text size="xs" c="red" style={{ fontFamily: 'monospace' }} ta="center">
            {error.message}
          </Text>
        )}
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="light"
            onClick={onRetry}
          >
            Reload Table
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export function StatsErrorFallback({ onRetry, error, sectionName }: ErrorFallbackProps) {
  return (
    <Alert
      icon={<IconAlertTriangle size={16} />}
      title="Statistics Unavailable"
      color="red"
      variant="light"
    >
      <Stack gap="sm">
        <Text size="sm">
          Unable to load {sectionName || 'statistics'}. The rest of your dashboard is working normally.
        </Text>
        {process.env.NODE_ENV === 'development' && error && (
          <Text size="xs" c="red" style={{ fontFamily: 'monospace' }}>
            {error.message}
          </Text>
        )}
        {onRetry && (
          <Group>
            <Button
              leftSection={<IconRefresh size={16} />}
              variant="light"
              size="sm"
              onClick={onRetry}
            >
              Retry
            </Button>
          </Group>
        )}
      </Stack>
    </Alert>
  );
}

export function CardErrorFallback({ onRetry, error, sectionName }: ErrorFallbackProps) {
  return (
    <Card withBorder style={{ minHeight: '200px' }}>
      <Stack align="center" justify="center" gap="md" style={{ minHeight: '150px' }}>
        <ThemeIcon size={50} variant="light" color="red">
          <IconCreditCard size={25} />
        </ThemeIcon>
        <Text size="md" fw={500}>Card Unavailable</Text>
        <Text size="sm" c="dimmed" ta="center">
          Unable to load {sectionName || 'card'} information.
        </Text>
        {process.env.NODE_ENV === 'development' && error && (
          <Text size="xs" c="red" style={{ fontFamily: 'monospace' }} ta="center">
            {error.message}
          </Text>
        )}
        {onRetry && (
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="light"
            size="sm"
            onClick={onRetry}
          >
            Reload
          </Button>
        )}
      </Stack>
    </Card>
  );
}