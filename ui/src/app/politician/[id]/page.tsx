"use client";

import { useEffect, useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const getPolitician = (id) =>
  fetch(`http://localhost:3000/politicians/${id}`).then((res) => res.json());

const patchPolitician = (id, data) =>
  fetch(`http://localhost:3000/politicians/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const deletePolitician = (id) =>
  fetch(`http://localhost:3000/politicians/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export default function Politician({ params }: { params: { id: number } }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({});

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

  const addNewData = (property, value) => {
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
      {isLoading && <CircularProgress />}

      {data && (
        <Fragment>
          <h1>Politician {params.id}</h1>

          {isEditing ? (
            <Fragment>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={saveData}>Save</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="error" onClick={deleteData}>
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </Fragment>
          )}
          {Object.keys(data._source).map((property) => (
            <TextField
              label={property}
              disabled={!isEditing}
              defaultValue={data._source[property]}
              onChange={(event) => addNewData(property, event.target.value)}
            />
          ))}
          <TextField
            label="Nombre"
            disabled={!isEditing}
            defaultValue="Marcial F Parrilla"
          />
          <TextField
            label="Partido"
            disabled={!isEditing}
            defaultValue="PSOE"
          />
          <TextField
            label="Salario"
            disabled={!isEditing}
            defaultValue="30.000"
          />
        </Fragment>
      )}
    </section>
  );
}
