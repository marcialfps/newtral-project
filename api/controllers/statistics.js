const { getStatistics } = require("../services/statistics");

exports.getStatistics = async (req, res) => {
  try {
    //No es necesario enviar datos al servicio
    const response = await getStatistics();
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};
