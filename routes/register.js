const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");
const { UserProfile, validate } = require("../models/userProfile");

router.post("/createNewAccount", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const userCheck = await UserProfile.findOne({
    userEmail: req.body.userEmail.toLowerCase(),
  });
  if (userCheck) {
    return res.status(400).send("User already registered.");
  }

  const user = new UserProfile({
    name: req.body.name,
    userName: req.body.userName,
    userEmail: req.body.userEmail.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 8),

    userRole: "user",
    age: req.body.age,
    gender: req.body.gender,
    phone: req.body.phone,
  });
  await user.save();
  const token = UserProfile.generateAuthToken.call(user);

  res
    .header("bearerToken", token)
    .send(_.pick(user, ["userEmail", "password", "userRole", "phone"]));
});

module.exports = router;
