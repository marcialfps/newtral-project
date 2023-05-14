const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "LDnu9Yo7RG_*QrLlHM9y",
  },
  tls: {
    ca: fs.readFileSync("./config/http_ca.crt"),
    rejectUnauthorized: false,
  },
});

const { dbPrototype } = require("./database-prototype");

const index = process.env.DB_INDEX ? process.env.DB_INDEX : "test";
const itemsPerPage = process.env.ITEMS_PER_PAGE
  ? process.env.ITEMS_PER_PAGE
  : "5";

const insertData = async (data) => {
  console.info("Starting ES bulk data to ", index);

  const bulkResponse = await client.helpers.bulk({
    datasource: data,
    onDocument(doc) {
      return {
        create: { _index: index, id: doc.id },
      };
    },
  });

  console.info("Finished ES bulk data to ", index);
  return bulkResponse;
};

const getAllDocuments = async (page) => {
  const result = await client.search({
    index: index,
    size: itemsPerPage,
    from: page,
  });

  console.log(result.hits.hits);
  return result.hits.hits;
};

const searchDocuments = async (filter, page) => {
  const searchParams = {
    index: index,
    query: {},
    size: itemsPerPage,
    from: page,
  };
  //Si el filtro es por nombre se activa la busqueda fuzzy
  if (filter.name) searchParams.query.fuzzy = filter;
  else searchParams.query.match = filter;

  const result = await client.search(searchParams);

  console.log(result.hits.hits);
  return result.hits.hits;
};

const aggregateDocuments = async (query) => {
  const result = await client.search({
    index: index,
    aggs: {
      ...query,
    },
  });

  return result.aggregations;
};

const getDocument = async (id) => {
  const result = await client.get({
    index: index,
    id: id,
  });

  console.log(result);
  return result;
};

const updateDocument = async (id, data) => {
  console.log("updateDocument", {
    index: index,
    id: id,
    doc: data,
  });
  const result = await client.update({
    index: index,
    id: id,
    doc: data,
  });

  return result;
};

const deleteDocument = async (id) => {
  const result = await client.delete({
    index: index,
    id: id,
  });

  return result;
};

const elasticSearchDB = Object.create(dbPrototype);
elasticSearchDB.insertData = insertData;
elasticSearchDB.getAllItems = getAllDocuments;
elasticSearchDB.searchItems = searchDocuments;
elasticSearchDB.aggregateItems = aggregateDocuments;
elasticSearchDB.getItem = getDocument;
elasticSearchDB.updateItem = updateDocument;
elasticSearchDB.deleteItem = deleteDocument;

module.exports = elasticSearchDB;
