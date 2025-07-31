import { Box, Grid, Stack } from "@mantine/core";
import { MainAppShell } from "@/app/_components/appShell/MainAppShell";
import { Stats } from "@/app/_components/dashboard/stats/Stats";
import { LastTransaction } from "@/app/_components/dashboard/lastTransaction/LastTransaction";
import CreditCard from "@/app/_components/dashboard/creditCard/CreditCard";
import DebitChart from "@/app/_components/dashboard/debitChart/DebitChart";
import { InvoiceTable } from "@/app/_components/dashboard/invoiceTable/InvoiceTable";

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
