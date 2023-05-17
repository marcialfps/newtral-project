"use client";

import * as React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

//Layout principal del sitio
//Para todas las páginas se muestra el AppBar para la navegación entre páginas
//El contenido de todas las páginas se pasa como children del componente stack,
//de esta manera el contenido se mostrará como una única columna

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Newtral UI</title>
      </head>
      <body className={inter.className}>
        <AppBar position="static">
          <Stack
            sx={{ p: 1, pr: 2, pl: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">
              <Typography variant="h6">Newtral UI</Typography>
            </Link>
            <Stack direction="row" spacing={3}>
              <Link href="/bulk">Importar</Link>
              <Link href="/statistics">Estadísticas</Link>
            </Stack>
          </Stack>
        </AppBar>
        <Stack sx={{ m: 2 }}>{children}</Stack>
      </body>
    </html>
  );
}
