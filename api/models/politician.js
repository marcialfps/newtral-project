const { convertStringToDouble } = require("../utils/utils");

//Se crea el objeto Politician a partir de la linea del CSV
//Se recibe el array de valores que se mapea a cada propiedad
//Los numeros decimales se convierten a float
exports.politician = (data) => ({
  nombre: data[0],
  partido: data[1],
  partido_para_filtro: data[2],
  genero: data[3],
  cargo_para_filtro: data[4],
  cargo: data[5],
  institucion: data[6],
  ccaa: data[7],
  sueldobase_sueldo: convertStringToDouble(data[8]),
  complementos_sueldo: convertStringToDouble(data[9]),
  pagaextra_sueldo: convertStringToDouble(data[10]),
  otrasdietaseindemnizaciones_sueldo: convertStringToDouble(data[11]),
  trienios_sueldo: convertStringToDouble(data[12]),
  retribucionmensual: convertStringToDouble(data[13]),
  retribucionanual: convertStringToDouble(data[14]),
  observaciones: data[15],
});
