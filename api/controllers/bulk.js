const bulkService = require("../services/bulk");
const { sendErrorResponse } = require("../utils/utils");

exports.bulkData = async (req, res) => {
  try {
    //Convertimos el buffer del fichero a un objeto Buffer
    const fileBuffer = Buffer.from(req.file.buffer);
    //Convertimos a string y dividimos los datos del CSV por lineas
    const plainData = fileBuffer.toString().split("\n");

    //Se envía al servicio los datos como un array
    const result = await bulkService.bulkData(plainData);
    sendResponse(res, 201, result);
  } catch (err) {
    console.error(err);
    sendErrorResponse(res, 500, err);
  }
};
