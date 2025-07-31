"use client";

import React, { useEffect, useState } from "react";
import { IconArrowDownRight, IconArrowUpRight, IconStar } from "@tabler/icons-react";
import { Avatar, Center, Group, Paper, RingProgress, SimpleGrid, Text, Skeleton } from "@mantine/core";
import { useDashboardError } from "../DashboardErrorBoundary";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

// Simulated API call that might fail
const fetchStatsData = async (): Promise<typeof data> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate random API failure (20% chance)
  if (Math.random() < 0.2) {
    throw new Error("Failed to fetch statistics data");
  }
  
  return [
    { label: "Page views", stats: "456,578", progress: 65, color: "teal", icon: "up" },
    { label: "New users", stats: "2,550", progress: 72, color: "blue", icon: "up" },
    { label: "Orders", stats: "4,735", progress: 52, color: "red", icon: "down" },
    { label: "Revenue", stats: "$12,345", progress: 85, color: "green", icon: "up" },
  ] as const;
};

export function StatsWithErrorHandling() {
  const [data, setData] = useState<typeof fetchStatsData extends () => Promise<infer T> ? T : never>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useDashboardError("Statistics");

  const loadData = async () => {
    try {
      setLoading(true);
      clearError();
      const statsData = await fetchStatsData();
      setData(statsData);
    } catch (err) {
      handleError(err instanceof Error ? err : new Error("Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return null; // Let the error boundary handle the error display
  }

  if (loading) {
    return (
      <SimpleGrid spacing={'xl'} cols={{ base: 1, sm: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <Paper shadow="xs" radius="lg" p="xs" py={'lg'} key={i}>
            <Group>
              <Skeleton height={50} circle />
              <div style={{ flex: 1 }}>
                <Skeleton height={12} width="60%" mb={8} />
                <Skeleton height={24} width="40%" />
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    );
  }

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper shadow="xs" radius="lg" p="xs" py={'lg'} key={stat.label}>
        <Group>
          <Avatar size={'xl'} color="blue" radius="100%">
            <IconStar size={50} />
          </Avatar>
          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="2xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid spacing={'xl'} cols={{ base: 1, sm: 4 }}>{stats}</SimpleGrid>;
}