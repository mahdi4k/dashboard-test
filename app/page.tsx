import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "./_components/appShell/MainAppShell";
import { Stats } from "./_components/dashboard/stats/Stats";
import { LastTransaction } from "./_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "./_components/dashboard/creditCard/CreditCard";
import DebitChart from "./_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "./_components/dashboard/invoiceTable/InvoiceTable";
import { 
  StatsSection, 
  CardSection, 
  ChartSection, 
  TableSection 
} from "./_components/DashboardSection";

export default function HomePage() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <StatsSection>
            <Stats />
          </StatsSection>
          <Grid mt={"xl"}>
            <CardSection>
              <LastTransaction />
            </CardSection>
            <CardSection>
              <CreditCard />
            </CardSection>
          </Grid>
          <Grid mt={"xl"}>
            <ChartSection>
              <DebitChart />
            </ChartSection>
            <TableSection>
              <InvoiceTable/>
            </TableSection>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}
