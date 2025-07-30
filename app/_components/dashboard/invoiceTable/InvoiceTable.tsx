"use client";

import { Avatar, Badge, Box, GridCol, Group, Paper, Select, Table, Text } from "@mantine/core";
import { IconAlbum, IconApple } from "@tabler/icons-react";

const data = [
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "5h ago",
    role: "Collaborator",
    lastActive: "450$",
    active: true,
  },
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "5h ago",
    role: "Collaborator",
    lastActive: "450$",
    active: true,
  },
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Henry Silkeater",
    job: "Designer",
    email: "5h ago",
    role: "Contractor",
    lastActive: "450$",
    active: false,
  },
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Henry Silkeater",
    job: "Designer",
    email: "5h ago",
    role: "Contractor",
    lastActive: "450$",
    active: false,
  },
];

export function InvoiceTable() {
  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" size={60} variant="light" radius={15}>
            <IconApple size={40} />
          </Avatar>
          <Box>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="green">
              {item.email}
            </Text>
          </Box>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text c={"dimmed"}>{item.lastActive}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <GridCol span={{ base: 12, xl: 4 }}>
      <Text fz={"h2"}>Invoices Sent</Text>
      <Paper shadow="xs" radius="lg" mt={"lg"} p="xs" py={"lg"}>
        <Table withRowBorders={false} verticalSpacing="lg">
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </GridCol>
  );
}
