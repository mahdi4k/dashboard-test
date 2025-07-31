'use client';

import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "../appShell/MainAppShell";
import { Stats } from "./stats/Stats";
import { LastTransaction } from "./lastTransaction/LastTransaction";
import CreditCard from "./creditCard/CreditCard";
import DebitChart from "./debitChart/DebitChart";
import { InvoiceTable } from "./invoiceTable/InvoiceTable";
import { 
  StatsSection, 
  CardSection, 
  ChartSection, 
  TableSection 
} from "../DashboardSection";
import { 
  ChartFallback, 
  TableFallback, 
  CardFallback 
} from "./CustomFallbacks";

export default function DashboardWithCustomFallbacks() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <StatsSection>
            <Stats />
          </StatsSection>
          <Grid mt={"xl"}>
            <CardSection fallback={<CardFallback />}>
              <LastTransaction />
            </CardSection>
            <CardSection fallback={<CardFallback />}>
              <CreditCard />
            </CardSection>
          </Grid>
          <Grid mt={"xl"}>
            <ChartSection fallback={<ChartFallback />}>
              <DebitChart />
            </ChartSection>
            <TableSection fallback={<TableFallback />}>
              <InvoiceTable/>
            </TableSection>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}