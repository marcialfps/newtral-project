require("dotenv").config({ path: "./tests/.env.test" });

const { getPoliticians } = require("../../controllers/politicians");
const { mockRequest, mockResponse, searchMockResponse } = require("./mocks");

//Mockeamos todo el modulo de ElasticSearch
jest.mock("@elastic/elasticsearch");

describe("Successful response - get all politicians", () => {
  //Creamos todos los mocks que vamos a utilizar en el test
  const req = mockRequest("/", "GET", "/politicians", {});
  const res = mockResponse();
  const searchMock = jest.fn(() => searchMockResponse);

  beforeAll(async () => {
    //Antes del test se pasa al mock del modulo nuestra implementacion
    require("@elastic/elasticsearch").__setMockFunction("search", searchMock);
    //Llamamos al controller correspondiente
    await getPoliticians(req, res);
  });

  test("Database should be called with correct info", () => {
    expect(searchMock).toHaveBeenCalledWith({
      index: "testIndex",
      size: "5",
      from: 0,
    });
  });

  test("Response should have correct info", () => {
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total: searchMockResponse.hits.total.value,
      items: searchMockResponse.hits.hits,
    });
  });
});
