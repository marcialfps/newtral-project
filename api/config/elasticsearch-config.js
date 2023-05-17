const fs = require("fs");

exports.elasticSearchConfig = {
  node: process.env.DB_URL,
  auth: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  tls: {
    ca: fs.readFileSync("./config/http_ca.crt"),
    rejectUnauthorized: false,
  },
};
