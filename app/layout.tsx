import "./globals.css";
import React from "react";
import ReactQueryProvider from "../context/QueryClientProvider";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"; // or `v14-appRouter` if you are using Next.js v14

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import ThemeProviderWrapper from "../context/ThemeProvider";

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <ThemeProviderWrapper>
          <body className={`${GeistSans.className}`}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </body>
        </ThemeProviderWrapper>
      </ReactQueryProvider>
    </html>
  );
}
