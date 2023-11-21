const express = require("express");
const {
  singup,
  login,
  verifyEmail,
  alluser,
} = require("../../Controllar/authControllar");
const _ = express.Router();

_.post("/singup", singup);
_.post("/login", login);
_.get("/verify/:id", verifyEmail);
_.get("/alluser", alluser);

module.exports = _;
