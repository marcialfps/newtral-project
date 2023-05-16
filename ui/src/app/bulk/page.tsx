"use client";

import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { bulkData } from "@/utils/api-connector";
import { ResponseType } from "@/utils/types";

export default function Bulk() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseType | null>(null);

  const sendData = async () => {
    setIsLoading(true);
    if (file) {
      const response = await bulkData(file);
      setResponse(response);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <Typography variant="h4" component="h1" gutterBottom>
        Importar datos
      </Typography>

      {response?.error && (
        <Stack sx={{ mt: 2 }} alignItems="center" justifyContent="center">
          <Alert severity="error">{response.error}</Alert>
        </Stack>
      )}

      <Card>
        <CardContent>
          <Stack
            sx={{ m: 2 }}
            flexWrap="wrap"
            useFlexGap
            spacing={3}
            divider={file && <Divider orientation="horizontal" flexItem />}
          >
            {isLoading ? (
              <CircularProgress sx={{ alignSelf: "center" }} />
            ) : (
              <Button component="label">
                Seleccionar fichero
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setFile(event.target.files ? event.target.files[0] : null);
                  }}
                />
              </Button>
            )}

            {file && !isLoading && (
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
