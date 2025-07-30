import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./global.css"

import React from "react";
import { MantineProvider, ColorSchemeScript, mantineHtmlProps, DirectionProvider } from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html dir="ltr" lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <DirectionProvider initialDirection="ltr">
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
