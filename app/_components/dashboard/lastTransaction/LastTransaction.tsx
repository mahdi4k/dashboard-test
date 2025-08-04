"use client";

import { Avatar, Badge, Box, GridCol, Group, Paper, Skeleton, Table, Text, Transition } from "@mantine/core";
import { IconApple } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const rolesData = ["Manager", "Collaborator", "Contractor"];

export function LastTransaction() {
  const t = useTranslations("last_transaction");
  const [mounted, setMounted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
      setMounted(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);
  const data = [
    {
      avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
      name: "Robert Wolfkisser",
      job: t("job"),
      email: "rob_wolf@gmail.com",
      role: t("role"),
      lastActive: t("last_active"),
      active: true,
    },
    {
      avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
      name: "Jill Jailbreaker",
      job: t("job"),
      email: "jj@breaker.com",
      role: t("role"),
      lastActive: t("last_active"),
      active: true,
    },
    {
      avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
      name: "Henry Silkeater3",
      job: t("job"),
      email: "henry@silkeater.io",
      role: t("role"),
      lastActive: t("last_active"),
      active: false,
    },
  ];

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
          {t("balance_amount")} {t("currency")}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <GridCol span={{ base: 12, xl: 8 }}>
      <Text fz="h2">{t("title")}</Text>
      {showSkeleton && <Skeleton height={300} radius="lg" mt="lg" />}

      <Transition mounted={mounted} transition="fade" duration={400} timingFunction="ease">
        {(styles) => (
          <Paper style={styles} shadow="xs" radius="lg" mt="lg" p="xs" py="lg">
            <Table.ScrollContainer minWidth={600}>
              <Table withRowBorders={false} verticalSpacing="xs">
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Paper>
        )}
      </Transition>
    </GridCol>
  );
}
