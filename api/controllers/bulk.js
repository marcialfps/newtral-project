const bulkService = require("../services/bulk");

exports.bulkData = async (req, res) => {
  try {
    //Convertimos el buffer del fichero a un objeto Buffer
    const fileBuffer = Buffer.from(req.file.buffer);
    //Convertimos a string y dividimos los datos del CSV por lineas
    const plainData = fileBuffer.toString().split("\n");

    //Se envía al servicio los datos como un array
    const response = await bulkService.bulkData(plainData);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
