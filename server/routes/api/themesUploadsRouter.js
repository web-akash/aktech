const express = require("express");
const {
  themesUploadController,
  getallThemes,
  deleteThemes,
} = require("../../Controllar/themesUploadControllar");
const _ = express.Router();
const upload = require("../../utils/multerUploads");
_.post("/upload", upload.single("thumbnail"), themesUploadController);
_.get("/getThemes", getallThemes);
_.post("/delete", deleteThemes);

module.exports = _;
