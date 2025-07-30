import { Group, Burger, Box, ActionIcon, Input, Flex, useDirection } from "@mantine/core";
import React, { FC } from "react";
import { ThemeToggle } from "../themeToggle/ThemeToggle";
import { IconBell, IconSearch, IconTextDirectionLtr, IconTextDirectionRtl } from "@tabler/icons-react";

type props = {
  opened: boolean;
  toggle: () => void;
};

const AppHeader: FC<props> = ({ opened, toggle }) => {
  const { toggleDirection, dir } = useDirection();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} size="sm" />
      <Flex gap={"lg"} align={"center"}>
        <Input visibleFrom="xl" radius={"lg"} variant="unstyled" styles={{input:{boxShadow:'var(--mantine-shadow-custom)'}}} placeholder="Your email" leftSection={<IconSearch size={16} />} />
        <ThemeToggle />
        <ActionIcon variant="subtle" radius={"xl"} size="xl" aria-label="Toggle color scheme">
          <IconBell stroke={1.5} />
        </ActionIcon>

        <ActionIcon onClick={() => toggleDirection()} variant="subtle" radius="md" size="lg">
          {dir === "rtl" ? <IconTextDirectionLtr stroke={1.5} /> : <IconTextDirectionRtl stroke={1.5} />}
        </ActionIcon>
      </Flex>
    </Group>
  );
};

export default AppHeader;
