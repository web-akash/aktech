const themesModel = require("../models/themesModel");
const fs = require("fs");

const themesUploadController = async (req, res) => {
  const {
    titel,
    link,
    price,
    discountPrice,
    discription,
    category,
    features,
    templates,
  } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const mng = themesModel({
    titel: titel,
    link: link,
    thumbnail: `thumbnail/${req.file.filename}`,
    price: price,
    discountPrice: discountPrice,
    discription: discription,
    category: category,
    features: features,
    templates: templates,
  });
  await mng.save();
  return res.status(200).json({ success: "uploaded successfully" });
};
const getallThemes = async (req, res) => {
  let data = await themesModel.find({});
  res.json(data);
};

const deleteThemes = async (req, res) => {
  const { id } = req.body;
  const item = await themesModel.findById(id);
  if (!item) {
    return res.status(404).json({ error: "theme not found" });
  }
  const path = item.thumbnail;
  if (path) {
    fs.unlinkSync(path);
  }
  const data = await themesModel.findByIdAndRemove(id);
  return res.status(200).json({ success: "deleted successfully" });
};

module.exports = { themesUploadController, getallThemes, deleteThemes };
