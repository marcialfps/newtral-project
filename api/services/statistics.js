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
    top10: {
      top_metrics: {
        metrics: { field: "sueldobase_sueldo" },
        sort: { sueldobase_sueldo: "desc" },
        size: 10,
      },
    },
  };

  //Enviamos los parametros de agregacion a la BD
  const results = await db.aggregateItems(aggregationParams);

  return results;
};
