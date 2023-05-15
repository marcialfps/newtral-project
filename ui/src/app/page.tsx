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
import Link from "next/link";
import { getPoliticians, searchPoliticians } from "@/utils/api-connector";
// import IconButton from "@mui/material/IconButton";
// import FirstPageIcon from "@mui/icons-material/FirstPage";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import LastPageIcon from "@mui/icons-material/LastPage";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [nameFilter, setNameFilter] = useState(null);
  const [partyFilter, setPartyFilter] = useState(null);
  const [genderFilter, setGenderFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const politicians = await getPoliticians(page);
      setData(politicians);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  const searchData = async () => {
    setIsLoading(true);
    let filteredPoliticians;
    if (nameFilter) {
      filteredPoliticians = await searchPoliticians(`name=${nameFilter}`);
    } else if (partyFilter) {
      filteredPoliticians = await searchPoliticians(`party=${partyFilter}`);
    } else if (genderFilter) {
      filteredPoliticians = await searchPoliticians(`gender=${genderFilter}`);
    }
    setIsLoading(false);
    if (filteredPoliticians) setData(filteredPoliticians);
  };

  return (
    <section>
      <h1>Home</h1>

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
      <Button onClick={searchData}>Search</Button>

      {/* {error && <Alert severity="error">{error.message}</Alert>} */}

      {isLoading && <CircularProgress />}

      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Partido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((politician) => (
                <TableRow key={politician._id}>
                  <TableCell>{politician._source.nombre}</TableCell>
                  <TableCell>{politician._source.partido}</TableCell>
                  <TableCell style={{ width: 160 }} align="right">
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
                  count={data.total}
                  rowsPerPage={5}
                  rowsPerPageOptions={-1}
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
