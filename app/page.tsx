import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "./_components/appShell/MainAppShell";
import { Stats } from "./_components/dashboard/stats/Stats";
import { LastTransaction } from "./_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "./_components/dashboard/creditCard/CreditCard";
import DebitChart from "./_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "./_components/dashboard/invoiceTable/InvoiceTable";
import { DashboardErrorBoundary } from "./_components/dashboard/DashboardErrorBoundary";

export default function HomePage() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <DashboardErrorBoundary sectionName="Statistics">
            <Stats />
          </DashboardErrorBoundary>
          
          <Grid mt={"xl"}>
            <DashboardErrorBoundary sectionName="Last Transaction">
              <LastTransaction />
            </DashboardErrorBoundary>
            <DashboardErrorBoundary sectionName="Credit Card">
              <CreditCard />
            </DashboardErrorBoundary>
          </Grid>
          
          <Grid mt={"xl"}>
            <DashboardErrorBoundary sectionName="Debit Chart">
              <DebitChart />
            </DashboardErrorBoundary>
            <DashboardErrorBoundary sectionName="Invoice Table">
              <InvoiceTable/>
            </DashboardErrorBoundary>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}
