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

export default function Politician({ params }: { params: { id: number } }) {
  const [data, setData] = useState<ItemResponseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newData, setNewData] = useState<PoliticianType>({});

  useEffect(() => {
    const fetchData = async () => {
      const politician = await getPolitician(params.id);
      setData(politician);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const saveData = async () => {
    setIsLoading(true);
    await patchPolitician(params.id, newData);
    const politician = await getPolitician(params.id);
    setData(politician);
    setIsEditing(false);
    setIsLoading(false);
  };

  const addNewData = (property: string, value: string) => {
    const prevData = newData;
    prevData[property] = value;
    setNewData(prevData);
  };

  const deleteData = async () => {
    setIsLoading(true);
    await deletePolitician(params.id);
    setIsLoading(false);
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
                    Cancel
                  </Button>
                  <Button onClick={saveData}>Save</Button>
                </Stack>
              ) : (
                <Stack flexDirection="row" justifyContent="space-between">
                  <Button color="error" onClick={deleteData}>
                    Delete
                  </Button>
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                </Stack>
              )}
              {Object.keys(data._source).map((property) => (
                <TextField
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
