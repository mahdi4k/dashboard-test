"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#f1f4fe",
  "#e4e6ed",
  "#c8cad3",
  "#a9adb9",
  "#9094a3",
  "#7f8496",
  "#777c91",
  "#63687c",
  "#595e72",
  "#4a5167",
];

export const theme = createTheme({
  colors: {
    kiwi: myColor,
  },
  primaryColor: "kiwi",
  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
    xs: "2px 4px 7px var(--mantine-color-dark-outline-hover)",
    custom: "var(--app-shadow)"
  },
  fontSizes: {
    "2xl": "2rem", // 32px
    "4xl": "2.5rem", // 40px
  },
  spacing: {
    "2xl": "2rem",
    "4xl": "2.5rem",
  },
});
