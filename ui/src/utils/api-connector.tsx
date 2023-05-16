//Funciones para conectar con la API
//En todos los casos se convierte la respuesta a formato JSON
//La pantalla es la encargada de mostrar el error si se recibe ese valor en la respuesta

import {
  ItemResponseType,
  ItemsResponseType,
  ResponseType,
  StatisticsResponseType,
} from "./types";

export const getPoliticians = (page: number): Promise<ItemsResponseType> =>
  fetch(
    `http://${process.env.NEXT_PUBLIC_API_URL}/politicians?page=${page}`
  ).then((res) => res.json());

export const searchPoliticians = (filter: string): Promise<ItemsResponseType> =>
  fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/politicians?${filter}`).then(
    (res) => res.json()
  );

export const getPolitician = (id: number): Promise<ItemResponseType> =>
  fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/politicians/${id}`).then(
    (res) => res.json()
  );

export const patchPolitician = (
  id: number,
  data: Object
): Promise<ItemResponseType> =>
  fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/politicians/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deletePolitician = (id: number): Promise<ItemResponseType> =>
  fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/politicians/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export const getStatistics = (): Promise<StatisticsResponseType> =>
  fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/statistics`).then((res) =>
    res.json()
  );

//Es necesario convertir el fichero a FormData para enviarlo
//Se indica la key esperada del fichero que en este caso es "file"
export const bulkData = (file: File): Promise<ResponseType> => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/bulk`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};
