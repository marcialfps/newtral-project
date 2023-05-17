// @ts-nocheck

"use client";

import { useEffect, useState, Fragment } from "react";
import {
  getPolitician,
  patchPolitician,
  deletePolitician,
} from "@/utils/api-connector";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { ItemResponseType, PoliticianType } from "@/utils/types";
import { useRouter } from "next/navigation";

//Página de información y edición de un político

export default function Politician({ params }: { params: { id: number } }) {
  const router = useRouter();

  //Variable que contiene los datos de la API
  const [data, setData] = useState<ItemResponseType | null>(null);
  //Variable para indicar la carga
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //Variable para indicar si se está editando
  const [isEditing, setIsEditing] = useState<boolean>(false);
  //Variable para almacenar valores a actualizar
  const [newData, setNewData] = useState<PoliticianType>({});

  useEffect(() => {
    //Al montarse el componente por primera vez se llama a la API
    const fetchData = async () => {
      const politician = await getPolitician(params.id);
      setData(politician);
      setIsLoading(false);
    };
    fetchData();
  }, [params]);

  //Al hacer click en el botón de guardar se envía a la API los valores
  //A continuación se actualizan los datos del político
  const saveData = async () => {
    setIsLoading(true);
    await patchPolitician(params.id, newData);
    const politician = await getPolitician(params.id);
    setData(politician);
    setNewData({});
    setIsEditing(false);
    setIsLoading(false);
  };

  //Recibe la propiedad y el nuevo valor que se quiere actualizar
  //Ese nuevo valor se añade a la variable con los nuevos datos
  const addNewData = (property: string, value: string) => {
    const prevData = newData;
    prevData[property] = value;
    setNewData(prevData);
  };

  //Al hacer click en el botón de eliminar se llama a la API
  //Finalmente se redirecciona al home
  const deleteData = async () => {
    setIsLoading(true);
    await deletePolitician(params.id);
    setIsLoading(false);
    router.push("/");
  };

  return (
    <section>
      <Typography variant="h4" component="h1" gutterBottom>
        Información
      </Typography>

      <Card>
        <CardContent>
          {data?.error && (
            <Stack alignItems="center" justifyContent="center">
              <Alert severity="error">{data.error}</Alert>
            </Stack>
          )}

          {isLoading && (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress />
            </Stack>
          )}

          {data?._source && (
            <Stack
              sx={{ m: 2 }}
              flexWrap="wrap"
              alignItems="stretch"
              useFlexGap
              spacing={3}
            >
              {isEditing ? (
                <Stack flexDirection="row" justifyContent="space-between">
                  <Button color="secondary" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={saveData}>Guardar</Button>
                </Stack>
              ) : (
                <Stack flexDirection="row" justifyContent="space-between">
                  <Button color="error" onClick={deleteData}>
                    Eliminar
                  </Button>
                  <Button onClick={() => setIsEditing(true)}>Editar</Button>
                </Stack>
              )}
              {Object.keys(data._source).map((property) => (
                <TextField
                  key={property}
                  label={property}
                  disabled={!isEditing}
                  defaultValue={data._source ? data._source[property] : ""}
                  onChange={(event) => addNewData(property, event.target.value)}
                  fullWidth
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
