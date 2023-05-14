const fs = require("fs");

exports.elasticSearchConfig = {
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "LDnu9Yo7RG_*QrLlHM9y",
  },
  tls: {
    ca: fs.readFileSync("./config/http_ca.crt"),
    rejectUnauthorized: false,
  },
};
