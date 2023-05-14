const bulkController = require("../controllers/bulk.js");
const router = require("express").Router();
const multer = require("multer");

//middleware que obtiene el fichero enviado en la petición
const upload = multer();

router.post("/", upload.single("file"), bulkController.bulkData);

module.exports = router;
