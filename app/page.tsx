import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "./_components/appShell/MainAppShell";
import { Stats } from "./_components/dashboard/stats/Stats";
import { LastTransaction } from "./_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "./_components/dashboard/creditCard/CreditCard";
import DebitChart from "./_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "./_components/dashboard/invoiceTable/InvoiceTable";

export default function HomePage() {
  return (
    <Box>
      <MainAppShell>
        <Stack>
          <Stats />
          <Grid mt={"xl"}>
            <LastTransaction />
            <CreditCard />
          </Grid>
          <Grid mt={"xl"}>
            <DebitChart />
            <InvoiceTable/>
          </Grid>
        </Stack>
      </MainAppShell>
    </Box>
  );
}
