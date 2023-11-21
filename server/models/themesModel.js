const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const themesModel = new Schema({
  link: {
    type: String,
  },
  titel: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  price: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  discription: {
    type: String,
  },
  category: {
    type: String,
  },
  features: {
    type: String,
  },
  templates: {
    type: String,
  },
  view: {
    type: Number,
  },
  like: {
    type: Number,
  },
  totalPurchase: {
    type: Number,
  },
});

module.exports = mongoose.model("Theme", themesModel);
