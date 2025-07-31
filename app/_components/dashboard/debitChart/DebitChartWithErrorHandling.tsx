"use client";

import React, { useEffect, useState } from "react";
import { BarChart } from "@mantine/charts";
import { Flex, GridCol, Paper, Text, useDirection, LoadingOverlay } from "@mantine/core";
import { useAsyncErrorHandler } from "../../useAsyncError";

// Example API function that might fail
const fetchChartData = async () => {
  // Simulate API call that might fail
  const random = Math.random();
  if (random < 0.3) {
    throw new Error("Failed to fetch chart data");
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const handleAsyncError = useAsyncErrorHandler();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const chartData = await handleAsyncError(fetchChartData);
        if (chartData) {
          setData(chartData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [handleAsyncError]);

  return (
    <GridCol span={{base:12,xl:8}}>
      <Text fz={"h2"}>Debit & Credit Overview</Text>
      <Paper shadow="xs" radius="lg" mt={"lg"} p="xs" py={"lg"} pos="relative">
        <LoadingOverlay visible={loading} />
        
        <Flex gap={"xs"} fw={"bold"} justify={dir === "rtl" ? "flex-end" : "flex-start"}>
          <Text c={"var(--mantine-color-default-color)"}>$7,560</Text>{" "}
          <Text c={"var(--mantine-color-dimmed)"}>Debited &</Text>
          <Text c={"var(--mantine-color-default-color)"}>$5,420</Text>{" "}
          <Text c={"var(--mantine-color-dimmed)"}>Credited this Week</Text>
        </Flex>

        {data.length > 0 && (
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
        )}
      </Paper>
    </GridCol>
  );
};

export default DebitChartWithErrorHandling;