const politicianModel = require("../models/politician");
const db = require("../db/database-provider");

exports.bulkData = async (data) => {
  //TO-DO: se podría intentar crear el modelo a partir de la primera línea del CSV

  //Convertimos cada una de las líneas del CSV en un Politician mediante el modelo
  //Se ignora la primera línea
  const politicians = data.map(
    (dataItem, index) =>
      index !== 0 && politicianModel.politician(dataItem.split(";"))
  );

  //Enviamos el listado de Politicians a la BD
  await db.insertData(politicians);
};
