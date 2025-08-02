import { IconArrowDownRight, IconArrowUpRight, IconStar } from "@tabler/icons-react";
import { Avatar, Box, Center, Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function Stats() {
  const t = useTranslations("stats");
  const locale = useLocale();
  const isFa = locale === "fa";

  const data = [
    { label: t("page_views"), stats: "456578", progress: 65, color: "teal", icon: "up" },
    { label: t("new_users"), stats: "2,550", progress: 72, color: "blue", icon: "up" },
    {
      label: t("orders"),
      stats: "4,7325",
      progress: 52,
      color: "red",
      icon: "down",
    },
    {
      label: t("orderss"),
      stats: "4,735",
      progress: 52,
      color: "red",
      icon: "down",
    },
  ] as const;

  const formatted = new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Number(data[0].stats));

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper shadow="xs" radius="lg" p="xs" py={"lg"} key={stat.stats}>
        <Group>
          <Avatar size={"xl"} color="blue" radius="100%">
            <IconStar size={50} />
          </Avatar>
          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text
              size="2xl"
              fw={500}
              dir={isFa ? "rtl" : "ltr"}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {isFa ? (
                <>
                  {formatted}
                  <Box component="span" fz={"sm"}>
                    {t("currency")}
                  </Box>
                </>
              ) : (
                <>
                  {formatted}
                  <Box component="span">{t("currency")}</Box>
                </>
              )}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <SimpleGrid spacing={"xl"} cols={{ base: 1, sm: 4 }}>
      {stats}
    </SimpleGrid>
  );
}
