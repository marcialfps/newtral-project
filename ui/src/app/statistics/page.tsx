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
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { getStatistics } from "@/utils/api-connector";

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
      <Typography variant="h4" component="h1" gutterBottom>
        Estadísticas
      </Typography>

      {isLoading && <CircularProgress />}

      {data && (
        <Fragment>
          <Card>
            <CardContent>
              <Stack
                sx={{ m: 2 }}
                alignItems="center"
                justifyContent="center"
                useFlexGap
                spacing={3}
              >
                <p>La media de los sueldos es de {data.average.value} euros.</p>
                <p>
                  La mediana de los sueldos es de {data.median.value} euros.
                </p>
              </Stack>
            </CardContent>
          </Card>

          <TableContainer sx={{ mt: 2 }} component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#D1D1D1" }}>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Sueldo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top10.items.map((politician) => (
                  <TableRow key={politician._id}>
                    <TableCell>{politician._source.nombre}</TableCell>
                    <TableCell align="right">
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
