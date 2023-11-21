const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  username: {
    type: String,
  },
  googleId: {
    type: String,
  },
  profileimg: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },

  Permission: [{ type: String }],
  orderList: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("User", user);
