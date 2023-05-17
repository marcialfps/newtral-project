const statisticsController = require("../controllers/statistics");
const router = require("express").Router();

router.get("/", statisticsController.getStatistics);

module.exports = router;
