import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "./_components/appShell/MainAppShell";
import { Stats } from "./_components/dashboard/stats/Stats";
import { LastTransaction } from "./_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "./_components/dashboard/creditCard/CreditCard";
import DebitChart from "./_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "./_components/dashboard/invoiceTable/InvoiceTable";
import { DashboardSection } from "./_components/dashboard/DashboardSection";
import { 
  StatsErrorFallback, 
  TableErrorFallback, 
  ChartErrorFallback, 
  CardErrorFallback 
} from "./_components/dashboard/ErrorFallbacks";

export default function HomePage() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <DashboardSection 
            sectionName="Statistics" 
            withCard={false}
            fallback={<StatsErrorFallback sectionName="Statistics" />}
          >
            <Stats />
          </DashboardSection>
          <Grid mt={"xl"}>
            <DashboardSection 
              sectionName="Recent Transactions" 
              withCard={false}
              fallback={<TableErrorFallback sectionName="Recent Transactions" />}
            >
              <LastTransaction />
            </DashboardSection>
            <DashboardSection 
              sectionName="Credit Card" 
              withCard={false}
              fallback={<CardErrorFallback sectionName="Credit Card" />}
            >
              <CreditCard />
            </DashboardSection>
          </Grid>
          <Grid mt={"xl"}>
            <DashboardSection 
              sectionName="Debit Chart" 
              withCard={false}
              fallback={<ChartErrorFallback sectionName="Debit Chart" />}
            >
              <DebitChart />
            </DashboardSection>
            <DashboardSection 
              sectionName="Invoice Table" 
              withCard={false}
              fallback={<TableErrorFallback sectionName="Invoice Table" />}
            >
              <InvoiceTable/>
            </DashboardSection>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}
