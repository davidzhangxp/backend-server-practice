const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const { UserProfile } = require("../models/userProfile");
const isAuth = (req, res, next) => {
  let token = req.header("authorization"); // get the token from the req header;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  token = token.split("Bearer ").join("");
  console.log(token);
  try {
    // jwt.verify(
    //   token,
    //   config.get("jwtPrivateKey") || "angularSecurity_jwt",
    //   (err, decode) => {
    //     console.log("begin to verify token");
    //     if (err) {
    //       res.status(401).send({
    //         message: "Invalid Token",
    //       });
    //     } else {
    //       req.user = decode;
    //       next();
    //     }
    //   }
    // );
    const decoded = jwt.verify(
      token,
      config.get("jwtPrivateKey") || "angularSecurity_jwt"
    );
    console.log(decoded); // decode the token and check if it save with salt part;
    req._id = decoded._id; // get the user info from the jwt;
    next(); // give the control to callback function (req, res) => {};
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

router.get("/getAllUsers", isAuth, async (req, res) => {
  const users = await UserProfile.find();
  res.send(users);
});

module.exports = router;
