const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

//Se obtienen todas las rutas de los ficheros de rutas y se asignan a su recurso correspondiente
app.use("/bulk", require("./routes/bulk"));
app.use("/politicians", require("./routes/politicians"));
app.use("/statistics", require("./routes/statistics"));

module.exports = app;
