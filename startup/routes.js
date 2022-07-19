const express = require("express");
const cors = require("cors");
const register = require("../routes/register");
const login = require("../routes/login");
const users = require("../routes/users");
const news = require("../routes/news");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  // app.use("/", (req, res) => {
  //   res.send("team project data");
  // });
  app.use("/api/register", register);
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/news", news);
};
