"use client";

import { Avatar, Badge, Box, GridCol, Group, Paper, Table, Text } from "@mantine/core";
import { IconApple } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const data = [
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    active: true,
  },
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    role: "Collaborator",
    lastActive: "6 days ago",
    active: true,
  },
  {
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Henry Silkeater3",
    job: "Designer",
    email: "henry@silkeater.io",
    role: "Contractor",
    lastActive: "2 days ago",
    active: false,
  },
];

const rolesData = ["Manager", "Collaborator", "Contractor"];

export function LastTransaction() {
  const t = useTranslations("last_transaction");
  const rows = data.map((item, i) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar color="blue" size={60} variant="light" radius={20}>
            <IconApple size={40} />
          </Avatar>
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text c={"dimmed"}>{rolesData[i]}</Text>
      </Table.Td>
      <Table.Td>
        <Text c={"dimmed"}>{rolesData[i]}</Text>
      </Table.Td>
      <Table.Td>
        <Text c={"dimmed"}>{item.lastActive}</Text>
      </Table.Td>
      <Table.Td>
        <Text ta={"center"} c={"green"}>
          +780$
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <GridCol span={{ base: 12, xl: 8 }}>
      <Text fz={"h2"}>{t("title")}</Text>
      <Paper shadow="xs" radius="lg" mt={"lg"} p="xs" py={"lg"}>
        <Table.ScrollContainer  minWidth={600}>
          <Table withRowBorders={false} verticalSpacing="xs">
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </GridCol>
  );
}
