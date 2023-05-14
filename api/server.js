require("dotenv").config();
const app = require("./app");
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.info(`API listening on port ${port}`);
});
