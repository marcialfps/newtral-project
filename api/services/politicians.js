const db = require("../db/database-provider");

exports.getPoliticians = async (page, filter) => {
  if (filter) {
    //Si se recibe un filtro se realiza una operación de busqueda en la BD
    //Si no se recibe un numero de pagina se indica que sea la pagina inicial (0)
    return db.searchItems(filter, page || 0);
  } else {
    //Si no se recibe filtro se obtienen todos los documentos y se envia la pagina
    return db.getAllItems(page || 0);
  }
};

exports.getPolitician = async (id) => {
  //Enviamos el id que hemos recibido
  return db.getItem(id);
};

exports.patchPolitician = async (id, data) => {
  //Enviamos el id y los datos que ya están en formato JSON
  return db.updateItem(id, data);
};

exports.deletePolitician = async (id) => {
  //Enviamos el id que hemos recibido
  return db.deleteItem(id);
};
