const politiciansController = require("../controllers/politicians");
const router = require("express").Router();
//middleware que obtiene el body de la petición en formato json
const json = require("express").json();

router.get("/", politiciansController.getPoliticians);
router.get("/:id", politiciansController.getPolitician);
//el middleware es solo necesario en la petición PATCH
router.patch("/:id", json, politiciansController.patchPolitician);
router.delete("/:id", politiciansController.deletePolitician);

module.exports = router;
