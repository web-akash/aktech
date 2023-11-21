const mongoose = require("mongoose");
const { Schema } = mongoose;

const accessSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Theme" },
  permissionOne: {
    type: Boolean,
    default: true,
  },
  permissionTwo: {
    type: Boolean,
    default: true,
  },
  permissionThree: {
    type: Boolean,
    default: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  
});

module.exports = mongoose.model("Access", accessSchema);
