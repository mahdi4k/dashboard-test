"use client";

import React from "react";
import { Card, Text, Group, Grid, Box, GridCol, Flex } from "@mantine/core";
import classes from "./CreditCard.module.css"; // We'll create this CSS module
import { useTranslations } from "next-intl";

const CreditCard = () => {
  const t = useTranslations("credit");

  return (
    <GridCol span={{base:12,xl:4}}>
      <Flex align={"center"} justify={"space-between"}>
        <Text fz={"h2"}>{t("title")}</Text>
        <Text>{t("see_all")}</Text>
      </Flex>
      <Box mt={"lg"} className={classes.container}>
        <Card p={"0"} className={classes.card} radius="lg" shadow="sm">
          <Group justify="space-between" align="flex-start" p={"md"} pt={'lg'}>
            <Box>
              <Text className={classes.balanceLabel}>{t("balance")}</Text>
              <Text className={classes.balanceAmount}>{t("balance_amount")} {t("currency")}</Text>
            </Box>
            <Box className={classes.chipContainer}>
              <Box className={classes.chip} />
            </Box>
          </Group>

          <Grid className={classes.cardGrid} p={"md"} pb={'xl'} mt={"md"} gutter="md">
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
    </GridCol>
  );
};

export default CreditCard;
