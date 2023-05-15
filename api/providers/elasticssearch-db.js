const { Client } = require("@elastic/elasticsearch");
const { dbPrototype } = require("./database-prototype");
const { elasticSearchConfig } = require("../config/elasticsearch-config");

const client = new Client(elasticSearchConfig);

const index = process.env.DB_INDEX ? process.env.DB_INDEX : "test";
const itemsPerPage = process.env.ITEMS_PER_PAGE
  ? process.env.ITEMS_PER_PAGE
  : "5";

//Se utiliza la operacion bulk de ES para insertar todos los datos en una sola peticion
//Se introduce el indice mediante la funcion onDocument
const insertData = async (data) => {
  console.debug("Bulk data to ", index);
  const bulkResponse = await client.helpers.bulk({
    datasource: data,
    onDocument(doc) {
      return {
        create: { _index: index, id: doc.id },
      };
    },
  });

  return bulkResponse;
};

//Se realiza una operacion search sin query para devolver todos los documentos
//Se indica el numero de elementos a devolver con el size y la pagina con el from
//El parametro sort opcional es utilizado para ordenar y obtener el top10 de sueldos
const getAllDocuments = async (page, sort) => {
  console.debug("Get all documents in page ", page);
  const searchParams = {
    index: index,
    size: sort ? 10 : itemsPerPage,
    from: page * itemsPerPage,
  };
  if (sort) searchParams.sort = sort;
  const result = await client.search(searchParams);

  return result.hits.hits;
};

//Se realiza una operacion search
//Si es busqueda por nombre se utiliza fuzzy, sino un match para devolver el documento exacto
const searchDocuments = async (filter, page) => {
  console.debug("Search documents by filter ", filter, " in page ", page);
  const searchParams = {
    index: index,
    query: {},
    size: itemsPerPage,
    from: page * itemsPerPage,
  };
  //Si el filtro es por nombre se activa la busqueda fuzzy
  if (filter.name) searchParams.query.fuzzy = filter;
  else searchParams.query.match = filter;

  const result = await client.search(searchParams);

  return result.hits.hits;
};

//Se realiza una operacion search pero con una agregacion
//Se espera que la query de agregacion ya este formateada
const aggregateDocuments = async (query) => {
  console.debug("Aggregate documents to ", query);
  const result = await client.search({
    index: index,
    aggs: {
      ...query,
    },
  });

  return result.aggregations;
};

//Se realiza una operacion get por el id del documento
const getDocument = async (id) => {
  console.debug("Get document ", id);
  const result = await client.get({
    index: index,
    id: id,
  });

  return result;
};

//Se realiza una operacion update por el id del documento
//Los nuevos datos se envian en el doc
const updateDocument = async (id, data) => {
  console.debug("Update document ", id, " to ", data);
  const result = await client.update({
    index: index,
    id: id,
    doc: data,
  });

  return result;
};

//Se realiza una operacion delete por el id del documento
const deleteDocument = async (id) => {
  console.debug("Delete document ", id);
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
