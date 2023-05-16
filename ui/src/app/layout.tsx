"use client";

import * as React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  title = "Newtral UI",
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body className={inter.className}>
        <AppBar position="static">
          {/* <Toolbar> */}
          <Stack
            sx={{ p: 1 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">
              <Typography variant="h6">Newtral UI</Typography>
            </Link>
            <Stack direction="row" spacing={3}>
              <Link href="/bulk">Bulk data</Link>
              <Link href="/statistics">Statistics</Link>
            </Stack>
          </Stack>

          {/* </Toolbar> */}
        </AppBar>
        <Stack sx={{ m: 2 }}>{children}</Stack>
      </body>
    </html>
  );
}
