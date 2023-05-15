"use client";

import { useEffect, useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableBody";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const getStatistics = () =>
  fetch("http://localhost:3000/statistics").then((res) => res.json());

export default function Statistics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const statistics = await getStatistics();
      setData(statistics);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section>
      <h1>Statistics</h1>
      {isLoading && <CircularProgress />}

      {data && (
        <Fragment>
          <p>La media de los sueldos es de {data.average.value}</p>
          <p>La mediana de los sueldos es de {data.median.value}</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Sueldo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top10.items.map((politician) => (
                  <TableRow key={politician._id}>
                    <TableCell>{politician._source.nombre}</TableCell>
                    <TableCell>
                      {politician._source.sueldobase_sueldo}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Fragment>
      )}
    </section>
  );
}
