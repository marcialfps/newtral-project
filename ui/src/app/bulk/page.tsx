"use client";

import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const bulkData = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch("http://localhost:3000/bulk", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/form-data",
    // },
    body: formData,
  }).then((res) => res.json());
};

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
      <h1>Bulk data</h1>
      {isLoading && <CircularProgress />}

      <Button component="label">
        Choose file
        <input
          type="file"
          hidden
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
      </Button>
      {file && (
        <Fragment>
          <p>{file.name}</p>
          <Button onClick={sendData}>Upload</Button>
        </Fragment>
      )}
    </section>
  );
}
