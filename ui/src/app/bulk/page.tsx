"use client";

import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { bulkData } from "@/utils/api-connector";

export default function Bulk() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendData = async () => {
    setIsLoading(true);
    await bulkData(file);
    setIsLoading(false);
  };

  return (
    <section>
      <Typography variant="h4" component="h1" gutterBottom>
        Importar datos
      </Typography>

      {isLoading && <CircularProgress />}

      <Card>
        <CardContent>
          <Stack
            sx={{ m: 2 }}
            flexWrap="wrap"
            useFlexGap
            spacing={3}
            divider={file && <Divider orientation="horizontal" flexItem />}
          >
            <Button component="label">
              Seleccionar fichero
              <input
                type="file"
                hidden
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
            </Button>
            {file && (
              <Stack
                flexDirection="row"
                alignItems="baseline"
                justifyContent="space-evenly"
                flexWrap="wrap"
                spacing={3}
              >
                <p>Fichero seleccionado: {file.name}</p>
                <Button onClick={sendData}>Subir</Button>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </section>
  );
}
