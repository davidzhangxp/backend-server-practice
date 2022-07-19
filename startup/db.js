const mongoose = require("mongoose");
const config = require("config");

module.exports = function (params) {
  const db = config.get("db");
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connect to mongodb");
    })
    .catch((err) => {
      console.log(err.reason);
    });
};
