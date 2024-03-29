"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableBody";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { getPoliticians, searchPoliticians } from "@/utils/api-connector";
import { ItemsResponseType } from "@/utils/types";

//Página principal

export default function Home() {
  //Variable que contiene los datos de la API
  const [data, setData] = useState<ItemsResponseType | null>(null);

  //Variable para indicar la carga
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //Variable para obtener la página actual
  const [page, setPage] = useState<number>(0);

  //Variables para cada uno de los filtros
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [partyFilter, setPartyFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  useEffect(() => {
    //Al montarse el componente por primera vez o al cambiar de página se llama a la API
    const fetchData = async () => {
      const politicians = await getPoliticians(page);
      setData(politicians);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  //Al hacer click en el botón de buscar se setea la página a 0 y se llama a la API con el filtro
  const searchData = async () => {
    setIsLoading(true);
    setPage(0);
    let filteredPoliticians;
    if (nameFilter) {
      filteredPoliticians = await searchPoliticians(`name=${nameFilter}`);
    } else if (partyFilter) {
      filteredPoliticians = await searchPoliticians(`party=${partyFilter}`);
    } else if (genderFilter) {
      filteredPoliticians = await searchPoliticians(`gender=${genderFilter}`);
    } else {
      filteredPoliticians = await getPoliticians(0);
    }
    setIsLoading(false);
    if (filteredPoliticians) setData(filteredPoliticians);
  };

  return (
    <section>
      <Typography variant="h4" component="h1" gutterBottom>
        Inicio
      </Typography>

      <Card>
        <CardContent>
          <Stack
            sx={{ m: 2 }}
            flexDirection="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            useFlexGap
            spacing={3}
          >
            <TextField
              label="Nombre"
              onChange={(event) => {
                setNameFilter(event.target.value);
              }}
            />
            <TextField
              label="Partido"
              onChange={(event) => {
                setPartyFilter(event.target.value);
              }}
            />
            <TextField
              label="Género"
              onChange={(event) => {
                setGenderFilter(event.target.value);
              }}
            />
            <Button onClick={searchData}>Buscar</Button>
          </Stack>
        </CardContent>
      </Card>

      {data?.error && (
        <Stack sx={{ mt: 2 }} alignItems="center" justifyContent="center">
          <Alert severity="error">{data.error}</Alert>
        </Stack>
      )}

      {isLoading && (
        <Stack sx={{ mt: 2 }} alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}

      {data?.items && (
        <TableContainer sx={{ mt: 2 }} component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#D1D1D1" }}>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Partido</TableCell>
                <TableCell align="right">Opciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((politician) => (
                <TableRow key={politician._id}>
                  <TableCell>{politician._source?.nombre}</TableCell>
                  <TableCell>{politician._source?.partido}</TableCell>
                  <TableCell align="right">
                    <Link href={`/politician/${politician._id}`}>
                      Ver más...
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.total || 0}
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  page={page}
                  onPageChange={() => setPage(page + 1)}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
