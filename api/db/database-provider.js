const elasticsearch = require("../providers/elasticssearch-db");
const defaultprovider = "elasticsearch";
const dbProviderType = process.env.DB_PROVIDER_TYPE
  ? process.env.DB_PROVIDER_TYPE
  : defaultprovider;

//Permitimos tener diferentes bases de datos que pueden cambiar de acuerdo a las variables del entorno
const resolveProvider = () => {
  switch (dbProviderType) {
    case "elasticsearch":
      return elasticsearch;
    default:
      return elasticsearch;
  }
};

module.exports = resolveProvider();
