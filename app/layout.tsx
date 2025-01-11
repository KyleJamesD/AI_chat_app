import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


export const theme = createTheme({
  /* Put your mantine theme override here */
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <MantineProvider theme={theme}>
        {children}
        </MantineProvider>
      </body>
    </html>
  );
}
