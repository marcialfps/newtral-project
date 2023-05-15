export const getPoliticians = (page) =>
  fetch(`http://localhost:3000/politicians?page=${page}`).then((res) =>
    res.json()
  );

export const searchPoliticians = (filter) =>
  fetch(`http://localhost:3000/politicians?${filter}`).then((res) =>
    res.json()
  );

export const getPolitician = (id) =>
  fetch(`http://localhost:3000/politicians/${id}`).then((res) => res.json());

export const patchPolitician = (id, data) =>
  fetch(`http://localhost:3000/politicians/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deletePolitician = (id) =>
  fetch(`http://localhost:3000/politicians/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export const getStatistics = () =>
  fetch("http://localhost:3000/statistics").then((res) => res.json());

export const bulkData = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return fetch("http://localhost:3000/bulk", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
};
