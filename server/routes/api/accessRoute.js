const express = require("express");
const _ = express.Router();

const { isAllow } = require("../../Controllar/accessController");

_.post("/access",isAllow)

module.exports = _;
