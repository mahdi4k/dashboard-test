"use client";

import React, { useEffect, useState } from "react";
import { Card, Text, Group, Grid, Box, GridCol, Flex, Transition, Skeleton } from "@mantine/core";
import classes from "./CreditCard.module.css"; // We'll create this CSS module
import { useTranslations } from "next-intl";

const CreditCard = () => {
  const t = useTranslations("credit");
  const [mounted, setMounted] = useState(false); // you can toggle this as needed
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
      setMounted(true);
    }, 500); // Delay the mount by 500ms

    return () => clearTimeout(timeout);
  }, []);

  return (
    <GridCol span={{ base: 12, xl: 4 }}>
      <Flex align={"center"} justify={"space-between"}>
        <Text fz={"h2"}>{t("title")}</Text>
        <Text>{t("see_all")}</Text>
      </Flex>
      {showSkeleton && <Skeleton height={300} radius="lg" mt="lg" />}
      <Transition mounted={mounted} transition="scale" duration={800} timingFunction="ease">
        {(styles) => (
          <Box style={styles} mt={"lg"} className={classes.container}>
            <Card p={"0"} className={classes.card} radius="lg" shadow="sm">
              <Group justify="space-between" align="flex-start" p={"md"} pt={"lg"}>
                <Box>
                  <Text className={classes.balanceLabel}>{t("balance")}</Text>
                  <Text className={classes.balanceAmount}>
                    {t("balance_amount")} {t("currency")}
                  </Text>
                </Box>
                <Box className={classes.chipContainer}>
                  <Box className={classes.chip} />
                </Box>
              </Group>

              <Grid className={classes.cardGrid} p={"md"} pb={"xl"} mt={"md"} gutter="md">
                <Grid.Col span={6}>
                  <Text className={classes.label}>{t("card_holder")}</Text>
                  <Text className={classes.value}>Eddy Cusuma</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text className={classes.label}>{t("valid_thru")}</Text>
                  <Text className={classes.value}>12/22</Text>
                </Grid.Col>
              </Grid>

              <Box className={classes.cardFooter}>
                <Group justify="space-between" align="center">
                  <Text className={classes.cardNumber}>3778 **** **** 1234</Text>
                  <Group gap={0}>
                    <Box className={classes.contactlessIcon} />
                    <Box className={classes.contactlessIcon} />
                  </Group>
                </Group>
              </Box>
            </Card>
          </Box>
        )}
      </Transition>
    </GridCol>
  );
};

export default CreditCard;
