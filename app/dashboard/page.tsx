import { Box, Grid, Stack, Title } from "@mantine/core";
import { MainAppShell } from "../_components/appShell/MainAppShell";
import { Stats } from "../_components/dashboard/stats/Stats";
import { LastTransaction } from "../_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "../_components/dashboard/creditCard/CreditCard";
import DebitChart from "../_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "../_components/dashboard/invoiceTable/InvoiceTable";
import { DashboardSection } from "../_components/dashboard/DashboardSection";
import { ErrorSimulator } from "../_components/dashboard/ErrorSimulator";
import { 
  StatsErrorFallback, 
  TableErrorFallback, 
  ChartErrorFallback, 
  CardErrorFallback 
} from "../_components/dashboard/ErrorFallbacks";

export default function DashboardPage() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <Title order={1} mb="md">Dashboard</Title>
          
          {/* Statistics Section with Error Boundary */}
          <DashboardSection 
            sectionName="Statistics" 
            withCard={false}
            fallback={<StatsErrorFallback sectionName="Statistics" />}
          >
            <ErrorSimulator sectionName="Statistics" errorType="network">
              <Stats />
            </ErrorSimulator>
          </DashboardSection>

          {/* First Row - Transactions and Credit Card */}
          <Grid mt="xl">
            <DashboardSection 
              sectionName="Recent Transactions" 
              withCard={false}
              fallback={<TableErrorFallback sectionName="Recent Transactions" />}
            >
              <ErrorSimulator sectionName="Recent Transactions" errorType="async">
                <LastTransaction />
              </ErrorSimulator>
            </DashboardSection>
            
            <DashboardSection 
              sectionName="Credit Card" 
              withCard={false}
              fallback={<CardErrorFallback sectionName="Credit Card" />}
            >
              <ErrorSimulator sectionName="Credit Card" errorType="render">
                <CreditCard />
              </ErrorSimulator>
            </DashboardSection>
          </Grid>

          {/* Second Row - Chart and Invoice Table */}
          <Grid mt="xl">
            <DashboardSection 
              sectionName="Debit Chart" 
              withCard={false}
              fallback={<ChartErrorFallback sectionName="Debit Chart" />}
            >
              <ErrorSimulator sectionName="Debit Chart" errorType="network">
                <DebitChart />
              </ErrorSimulator>
            </DashboardSection>
            
            <DashboardSection 
              sectionName="Invoice Table" 
              withCard={false}
              fallback={<TableErrorFallback sectionName="Invoice Table" />}
            >
              <ErrorSimulator sectionName="Invoice Table" errorType="async">
                <InvoiceTable />
              </ErrorSimulator>
            </DashboardSection>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}