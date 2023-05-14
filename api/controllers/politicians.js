const politiciansService = require("../services/politicians");

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
    const response = await politiciansService.getPoliticians(
      req.query.page,
      filter
    );
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id
    const response = await politiciansService.getPolitician(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.patchPolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id y el body que ya ha sido convertido a JSON por el middleware
    const response = await politiciansService.patchPolitician(
      req.params.id,
      req.body
    );
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deletePolitician = async (req, res) => {
  try {
    //Enviamos al servicio el parametro id
    const response = await politiciansService.deletePolitician(req.params.id);
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
