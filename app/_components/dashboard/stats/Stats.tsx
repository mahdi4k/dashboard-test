import { IconArrowDownRight, IconArrowUpRight, IconStar } from "@tabler/icons-react";
import { Avatar, Center, Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const data = [
  { label: "Page views", stats: "456,578", progress: 65, color: "teal", icon: "up" },
  { label: "New users", stats: "2,550", progress: 72, color: "blue", icon: "up" },
  {
    label: "Orders",
    stats: "4,735",
    progress: 52,
    color: "red",
    icon: "down",
  },
  {
    label: "Orderss",
    stats: "4,735",
    progress: 52,
    color: "red",
    icon: "down",
  },
] as const;

export function Stats() {
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
