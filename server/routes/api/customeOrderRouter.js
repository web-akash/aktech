const express = require("express");
const _ = express.Router();
const {
  customeOdrderControllar,
  myOrderList,
  orderHide,
} = require("../../Controllar/customeOdrderControllar.js");

_.post("/confrimeOrder", customeOdrderControllar);
_.post("/view", myOrderList);  // customer can view his order if payment paid  // 5/11
_.post("/hide/:id", orderHide); // customer perceptive hide his order not admin // 5/11

module.exports = _;
