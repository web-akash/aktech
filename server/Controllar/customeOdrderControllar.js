const Order = require("../models/newOrderModel");
const { tryCatch } = require("../utils/tryCatch");
const appStatus = require("../utils/appStatus");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../error/customError");
const customeOdrderControllar = async (req, res) => {
  const orderData = req.body;
};


const myOrderList = tryCatch(async (req, res, next) => {
  const { id } = req.body;

  const allOrder = await Order.find({ buyerEmail: id, show: true });
  if (!allOrder.length > 0) {
    return next(new NotFoundError("No Order"));
  }
  appStatus(200, "Order List", allOrder, res);
});

const orderHide = tryCatch(async (req, res, next) => {
  const uid = req.params.id;

  const hideThis = await Order.findByIdAndUpdate(
    { _id: uid },
    { $set: { show: false } },
    { new: true }
  );

  if (!hideThis) {
    return next(new NotFoundError("Order Not Found"));
  }

  appStatus(200, "Delete", "", res);
});

module.exports = { customeOdrderControllar, myOrderList, orderHide };
