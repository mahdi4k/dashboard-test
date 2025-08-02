"use client";

import { AppShell, Box, Burger, Flex, Group, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MainNavbar } from "./navbar/AppNavbar";
import AppHeader from "./header/AppHeader";
import cx from "clsx";

export function MainAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: { base: 20, lg: 250 }, breakpoint: "lg", collapsed: { mobile: !opened, desktop: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar
        styles={{
          navbar: {
            width: "250px !important", // desired width
            maxWidth: "80vw", // prevent overflow
           },
        }}
      >
        <Flex direction={{ base: "column", lg: "row" }}>
          <Burger opened={opened} mt={"lg"} ms={"lg"} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MainNavbar />
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main
        bg={cx(
          { "var(--mantine-color-red-outline-hover)": colorScheme === "light" },
          { "var(--mantine-color-red-outline-hover)": colorScheme === "dark" }
        )}
      >
        <Box maw={1900} py={"md"} mx={"auto"}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
