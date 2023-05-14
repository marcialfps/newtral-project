const { getStatistics } = require("../services/statistics");
const { sendErrorResponse } = require("../utils/utils");

exports.getStatistics = async (req, res) => {
  try {
    //No es necesario enviar datos al servicio
    const result = await getStatistics();
    sendResponse(res, 200, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};
