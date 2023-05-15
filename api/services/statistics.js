const db = require("../db/database-provider");

exports.getStatistics = async () => {
  //TO-DO: los parametros de agregacion depende de la BD, se debe quitar esta construccion de aqui
  const aggregationParams = {
    average: {
      avg: {
        field: "sueldobase_sueldo",
      },
    },
    median: {
      median_absolute_deviation: {
        field: "sueldobase_sueldo",
      },
    },
  };

  //Enviamos los parametros de agregacion a la BD
  const resultsAggregation = await db.aggregateItems(aggregationParams);

  //Obtenemos el top10
  const top10Sueldo = await db.getAllItems(0, {
    sueldobase_sueldo: "desc",
  });

  return { aggregation: resultsAggregation, top10: top10Sueldo };
};
