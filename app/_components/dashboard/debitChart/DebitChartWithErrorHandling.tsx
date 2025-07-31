"use client";

import React from "react";
import { BarChart } from "@mantine/charts";
import { Flex, GridCol, Paper, Text, useDirection, Skeleton } from "@mantine/core";
import { useDashboardData } from "../hooks/useAsyncData";

// Simulated API call for chart data
const fetchChartData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate random API failure (15% chance)
  if (Math.random() < 0.15) {
    throw new Error("Failed to fetch chart data from server");
  }
  
  return [
    { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];
};

const DebitChartWithErrorHandling = () => {
  const { dir } = useDirection();
  const { data, loading, error } = useDashboardData(
    "Debit Chart",
    fetchChartData,
    [], // dependencies
    {
      retryCount: 2,
      retryDelay: 2000,
    }
  );

  // If there's an error, let the error boundary handle it
  if (error) {
    throw error;
  }

  if (loading) {
    return (
      <GridCol span={{base:12,xl:8}}>
        <Text fz={"h2"}>Debit & Credit Overview</Text>
        <Paper shadow="xs" radius="lg" mt={"lg"} p="xs" py={"lg"}>
          <Skeleton height={20} width="60%" mb="md" />
          <Skeleton height={375} radius="md" />
        </Paper>
      </GridCol>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <GridCol span={{base:12,xl:8}}>
      <Text fz={"h2"}>Debit & Credit Overview</Text>
      <Paper shadow="xs" radius="lg" mt={"lg"} p="xs" py={"lg"}>
        <Flex gap={"xs"} fw={"bold"} justify={dir === "rtl" ? "flex-end" : "flex-start"}>
          <Text c={"var(--mantine-color-default-color)"}>$7,560</Text>{" "}
          <Text c={"var(--mantine-color-dimmed)"}>Debited &</Text>
          <Text c={"var(--mantine-color-default-color)"}>$5,420</Text>{" "}
          <Text c={"var(--mantine-color-dimmed)"}>Credited this Week</Text>
        </Flex>

        <BarChart
          withLegend
          h={375}
          data={data}
          dataKey="month"
          series={[
            { name: "Smartphones", color: "violet.6" },
            { name: "Laptops", color: "blue.6" },
            { name: "Tablets", color: "teal.6" },
          ]}
          tickLine="y"
        />
      </Paper>
    </GridCol>
  );
};

export default DebitChartWithErrorHandling;