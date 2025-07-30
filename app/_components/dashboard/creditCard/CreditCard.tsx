"use client";

import React from "react";
import { Card, Text, Group, Grid, Box, GridCol, Flex } from "@mantine/core";
import classes from "./CreditCard.module.css"; // We'll create this CSS module

const CreditCard = () => {
  return (
    <GridCol span={{base:12,xl:4}}>
      <Flex align={"center"} justify={"space-between"}>
        <Text fz={"h2"}>My Card</Text>
        <Text>See All</Text>
      </Flex>
      <Box mt={"lg"} className={classes.container}>
        <Card p={"0"} className={classes.card} radius="lg" shadow="sm">
          <Group justify="space-between" align="flex-start" p={"md"}>
            <Box>
              <Text className={classes.balanceLabel}>Balance</Text>
              <Text className={classes.balanceAmount}>$5,756</Text>
            </Box>
            <Box className={classes.chipContainer}>
              <Box className={classes.chip} />
            </Box>
          </Group>

          <Grid className={classes.cardGrid} p={"md"} mt={"md"} gutter="md">
            <Grid.Col span={6}>
              <Text className={classes.label}>CARD HOLDER</Text>
              <Text className={classes.value}>Eddy Cusuma</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text className={classes.label}>VALID THRU</Text>
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
