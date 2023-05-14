const elasticsearch = require("../providers/elasticssearch-db");
const defaultprovider = "elasticsearch";
const dbProviderType = process.env.DB_PROVIDER_TYPE
  ? process.env.DB_PROVIDER_TYPE
  : defaultprovider;

const resolveProvider = () => {
  switch (dbProviderType) {
    case "elasticsearch":
      return elasticsearch;
    default:
      return elasticsearch;
  }
};

module.exports = resolveProvider();
