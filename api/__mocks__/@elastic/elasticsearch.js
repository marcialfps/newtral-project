//Fichero que usa Jest para mockear todo el modulo de elasticsearch

const elastic = jest.createMockFromModule("@elastic/elasticsearch");

let mockFunction = {};
//Funcion auxiliar para mockear la funcion correspondiente del Client
const __setMockFunction = (name, response) => {
  mockFunction[name] = response;
};

elastic.__setMockFunction = __setMockFunction;
elastic.Client = jest.fn().mockImplementation(() => mockFunction);

module.exports = elastic;
