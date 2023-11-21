const mongoose = require("mongoose");
const { Schema } = mongoose;

const product = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Theme",
  },
  productInfo: { type: String },
  transitionId: {
    type: String,
  },
  buyerName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  buyerEmail: {
    type: String,
  },
  packagePrice: { type: Number },

  payment: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: true,
  },
  webType: {
    type: String,
  },
  refWeb: { type: String },
  orderDate: { type: Date, default: Date.now() },
  productPrice: { type: String },
  status: {
    type: String,
    enum: [
      "Pending",
      "Delivered",
      "Developing",
      "Correction",
      "Bug Fixing",
      "Updating",
      "Cancelled",
    ],
    default: "Pending",
  },
  cancelReason: { type: String },
  deliveryDate: { type: String },
  file: { type: String },
  dueAmount: { type: Number },
  paidAmount: { type: Number },
  paymentSchedule: { type: String },
  nextPayment: { type: String },
  paidInfo: [
    {
      paymentDate: { type: Date, default: Date.now() },
      paymentAmount: { type: Number },
      paymentBy: { type: String },
    },
  ],
});

module.exports = mongoose.model("Order", product);
