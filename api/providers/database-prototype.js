//Este prototipo permite variar que base de datos se utiliza sin tener que cambiar el código de los servicios
exports.dbPrototype = {
  insertData: async (data) => console.log("addDate unimplemented"),
  getAllItems: async (page, sort) => console.log("getAllItems unimplemented"),
  searchItems: async (filter, page) => console.log("searchItems unimplemented"),
  aggregateItems: async (query) => console.log("aggregateItems unimplemented"),
  getItem: async (id) => console.log("getItem unimplemented"),
  updateItem: async (id, data) => console.log("updateItem unimplemented"),
  deleteItem: async (id) => console.log("deleteItem unimplemented"),
};
