//En este fichero creamos los diferentes mocks que necesitaremos para los tests

//Mock de la request se envía
exports.mockRequest = (url, method, baseUrl, query) => ({
  url,
  method,
  baseUrl,
  query,
});

//Mock de la respuesta
//Mockeamos tanto el status como el json para comprobar que son llamados
exports.mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

exports.searchMockResponse = {
  took: 456,
  timed_out: false,
  _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
  hits: {
    total: { value: 4095, relation: "eq" },
    max_score: 1,
    hits: [
      {
        _index: "test4",
        _id: "LV1SIYgBAQ4x-R5SpOa5",
        _score: 1,
        _source: {
          nombre: "Josep Manel Francés i Reig",
          partido: "Junts per Agres",
          partido_para_filtro: "Otros partidos",
          genero: "Hombre",
          cargo_para_filtro: "Alcalde",
          cargo: "Alcalde",
          institucion: "Ayuntamiento de Agres",
          ccaa: "Comunidad Valenciana",
          sueldobase_sueldo: 8467.36,
          otrasdietaseindemnizaciones_sueldo: 0,
          retribucionmensual: 604.81,
          retribucionanual: 8467.36,
          observaciones: "Dedicación Parcial",
        },
      },
    ],
  },
};
