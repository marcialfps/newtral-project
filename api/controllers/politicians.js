const politiciansService = require("../services/politicians");
const { sendErrorResponse, sendResponse } = require("../utils/utils");

exports.getPoliticians = async (req, res) => {
  try {
    //Obtenemos los filtros que pueden venir como query params
    const { name, party, gender } = req.query;
    //Creamos la variable que contendrá un solo filtro y que será usado por el servicio
    let filter;

    //Asignamos el valor al filtro si alguno de los query params tiene valor
    if (name) filter = { name };
    else if (party) filter = { party };
    else if (gender) filter = { gender };

    //Enviamos al servicio el numero de pagina y el filtro
    const result = await politiciansService.getPoliticians(
      req.query.page,
      filter
    );
    sendResponse(res, 200, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};

exports.getPolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id
    const result = await politiciansService.getPolitician(req.params.id);
    sendResponse(res, 200, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};

exports.patchPolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id y el body que ya ha sido convertido a JSON por el middleware
    const result = await politiciansService.patchPolitician(
      req.params.id,
      req.body
    );
    sendResponse(res, 200, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};

exports.deletePolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id
    const result = await politiciansService.deletePolitician(req.params.id);
    sendResponse(res, 200, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};
