"use client";

import { IconArrowDownRight, IconArrowUpRight, IconStar } from "@tabler/icons-react";
import { Avatar, Box, Group, Paper, SimpleGrid, Skeleton, Text, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function Stats() {
  const t = useTranslations("stats");
  const locale = useLocale();
  const isFa = locale === "fa";

  const [mounted, setMounted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
      setShowSkeleton(false);
    }, 500); // Wait 500ms before showing

    return () => clearTimeout(timeout);
  }, []);

  const data = [
    { label: t("page_views"), stats: "456578", progress: 65, color: "teal", icon: "up" },
    { label: t("new_users"), stats: "2550", progress: 72, color: "blue", icon: "up" },
    { label: t("orders"), stats: "47325", progress: 52, color: "red", icon: "down" },
    { label: t("orderss"), stats: "4735", progress: 52, color: "red", icon: "down" },
  ] as const;

  const formatted = (stats: string) =>
    new Intl.NumberFormat(locale, {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(Number(stats));

  return (
    <SimpleGrid spacing="xl" cols={{ base: 1, sm: 4 }}>
      {data.map((stat) => {
        const Icon = icons[stat.icon];

        return (
          <Box key={stat.stats}>
            {showSkeleton && (
              <Group p="xs" py="lg">
                <Skeleton height={84} circle />
                <div style={{ flex: 1 }}>
                  <Skeleton height={12} width="40%" mb="sm" />
                  <Skeleton height={20} width="70%" />
                </div>
              </Group>
            )}
            <Transition key={stat.label} mounted={mounted} transition="fade" duration={600} timingFunction="ease">
              {(styles) => (
                <Paper style={styles} shadow="xs" radius="lg" p="xs" py="lg">
                  <Group>
                    <Avatar size="xl" color="blue" radius="100%">
                      <IconStar size={50} />
                    </Avatar>
                    <div>
                      <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                        {stat.label}
                      </Text>
                      <Text size="2xl" fw={500} dir={isFa ? "rtl" : "ltr"}>
                        {isFa ? (
                          <>
                            {formatted(stat.stats)}
                            <Box component="span" fz="sm">
                              {t("currency")}
                            </Box>
                          </>
                        ) : (
                          <>
                            <Box component="span">{t("currency")}</Box>
                            {formatted(stat.stats)}
                          </>
                        )}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              )}
            </Transition>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}
