const express = require("express");
const upload = require("../../utils/multer");
const {
  paymentConntrollar,
  success,
  paymentFaild,
  paymentCancel,
} = require("../../Controllar/paymentControllar");
const _ = express.Router();

_.post("/paymentSystem", upload.single("file"), paymentConntrollar);
_.post("/successproces/:tranid", success);
_.post("/paymentfail/:tranid", paymentFaild);
_.post("/paymentCancel/:tranid", paymentCancel);

module.exports = _;
