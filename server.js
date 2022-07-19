const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 4231;
const server = app.listen(port, () => {
  console.log("server is running");
});
