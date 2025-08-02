import { Group, Burger, Box, ActionIcon, Input, Flex, useDirection } from "@mantine/core";
import React, { FC } from "react";
import { ThemeToggle } from "../themeToggle/ThemeToggle";
import { IconBell, IconSearch, IconTextDirectionLtr, IconTextDirectionRtl } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type props = {
  opened: boolean;
  toggle: () => void;
};

const AppHeader: FC<props> = ({ opened, toggle }) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("header");
  const toggleDirection = () => {
    const currentPath = pathname || "";
    const isFa = currentPath.startsWith("/fa/dashboard");
    const newPath = isFa
      ? currentPath.replace("/fa/dashboard", "/en/dashboard")
      : currentPath.replace("/en/dashboard", "/fa/dashboard");

    router.push(newPath);
  };

  const isRtl = pathname?.startsWith("/fa/dashboard");

  return (
    <Group h="100%" px="md" justify="space-between">
      <Burger opened={opened} onClick={toggle} size="sm" />
      <Flex gap={"lg"} align={"center"}>
        <Input
          visibleFrom="xl"
          radius={"lg"}
          variant="unstyled"
          styles={{ input: { boxShadow: "var(--mantine-shadow-custom)" } }}
          placeholder={t("search")}
          leftSection={<IconSearch size={16} />}
        />
        <ThemeToggle />
        <ActionIcon variant="subtle" radius={"xl"} size="xl" aria-label="Toggle color scheme">
          <IconBell stroke={1.5} />
        </ActionIcon>

        <ActionIcon onClick={toggleDirection} variant="subtle" radius="md" size="lg">
          {isRtl ? <IconTextDirectionLtr stroke={1.5} /> : <IconTextDirectionRtl stroke={1.5} />}
        </ActionIcon>
      </Flex>
    </Group>
  );
};

export default AppHeader;
