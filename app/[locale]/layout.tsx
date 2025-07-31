import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "../global.css";

import React from "react";
import { MantineProvider, ColorSchemeScript, mantineHtmlProps, DirectionProvider } from "@mantine/core";
import { theme } from "../../theme";
import { NextIntlClientProvider } from "next-intl";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ await it

  const messages = await import(`@/messages/${locale}.json`).then((mod) => mod.default);
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DirectionProvider initialDirection={direction}>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
