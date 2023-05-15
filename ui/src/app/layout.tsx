"use client";

import * as React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
          <Toolbar>
            <Link href="/">
              <Typography variant="h6">Newtral UI</Typography>
            </Link>
            <Link href="/bulk">Bulk data</Link>
            <Link href="/statistics">Statistics</Link>
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
