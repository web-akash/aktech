const express = require("express");
const _ = express.Router();
const sucess = require("../api/sucees.js");
const auth = require("../api/auth.js");
const customeOrderRouter = require("./customeOrderRouter.js");
const themesUploadRouter = require("./themesUploadsRouter.js");
const adminRoute = require("../api/adminRoute.js");
const ax = require("../api/accessRoute.js");
_.use("/payment", sucess);
_.use("/auth", auth);
_.use("/order", customeOrderRouter); // new api need {customer order view and hide}

_.use("/themes", themesUploadRouter);
_.use("/ax", ax); // project link access api
_.use("/admin", adminRoute); // new api where admin can handle

module.exports = _;
