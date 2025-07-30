"use client";

import { AppShell, Box, Burger, Group, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MainNavbar } from "./navbar/AppNavbar";
import AppHeader from "./header/AppHeader";
import cx from "clsx";

export function MainAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened, desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MainNavbar />
        </Group>
      </AppShell.Navbar>
      <AppShell.Main
        bg={cx(
          { "var(--mantine-color-red-outline-hover)": colorScheme === "light" },
          { "var(--mantine-color-red-outline-hover)": colorScheme === "dark" }
        )}
      >
        <Box maw={1900} py={'md'} mx={"auto"}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
