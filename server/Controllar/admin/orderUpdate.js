const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");
const Order = require("../../models/newOrderModel");
const lib = require("../../utils/staticFile");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../error/customError");

const allOrder = tryCatch(async (req, res, next) => {
  const order = await Order.find();
  if (!order.length > 0) {
    return next(new NotFoundError("No Order"));
  }
  appStatus(200, "View", order, res);
});

const upDateOrder = tryCatch(async (req, res, next) => {
  const {
    deliveryDate,
    status,
    cancelReason,
    dueAmount,
    paidAmount,
    nextPayment,
    paymentDate,
    paymentAmount,
    paymentBy,
    paymentSchedule,
  } = req.body;

  const uid = req.params.id;
  const lib = {};
  const liib = {};

  deliveryDate && (lib.deliveryDate = deliveryDate);

  if (status) {
    lib.status = status;

    if (status === "Cancelled" && !cancelReason) {
      return next(new BadRequestError("Cancellation reason is required"));
    }

    lib.cancelReason = status !== "Cancelled" ? "" : cancelReason;
  }

  paymentSchedule && (lib.paymentSchedule = paymentSchedule);
  dueAmount && (lib.dueAmount = dueAmount);
  paidAmount && (lib.paidAmount = paidAmount);
  nextPayment && (lib.nextPayment = nextPayment);

  paymentDate && (liib.paymentDate = paymentDate);
  paymentAmount && (liib.paymentAmount = paymentAmount);
  paymentBy && (liib.paymentBy = paymentBy);

  const ifOrder = await Order.findOneAndUpdate(
    { _id: uid, payment: true },
    { $set: lib, $push: { paidInfo: liib } },
    { new: true }
  );

  if (!ifOrder) {
    return next(new InvalidEntry("Due Payment"));
  }

  appStatus(201, "Deliver Date Update", ifOrder, res);
});

const deleteOrder = tryCatch(async (req, res, next) => {
  const uid = req.params.id;
  const delFile = await Order.findById(uid);
  if (!delFile) {
    return next(new InvalidEntry("NO Order Found"));
  }
  await lib.delete(delFile.file, req, res);
  const ifThere = await Order.findByIdAndRemove({ _id: uid });
  if (ifThere) {
    appStatus(200, "Delete", "", res);
  } else {
    return next(new NotFoundError("NO Order Found"));
  }
});

const todayDelivery = tryCatch(async (req, res, next) => {
  const today = new Date().toISOString().split("T")[0];
  const ajDeliveryBro = await Order.find({ deliveryDate: today });

  if (!ajDeliveryBro || ajDeliveryBro.length === 0) {
    return next(new NotFoundError("No Delivery Today "));
  }

  appStatus(200, "", { ajDeliveryBro, total: ajDeliveryBro.length }, res);
});

const tomorrowDelivery = tryCatch(async (req, res, next) => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const todayFormatted = today.toISOString().split("T")[0];
  console.log(todayFormatted);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  const agamikalDelivery = await Order.find({
    deliveryDate: tomorrowFormatted,
  });

  if (!agamikalDelivery || agamikalDelivery.length === 0) {
    return next(new NotFoundError("No Delivery Tomorrow"));
  }

  appStatus(200, "", { agamikalDelivery, total: agamikalDelivery.length }, res);
});

const orderStatusShow = tryCatch(async (req, res, next) => {
  const { status } = req.body;
  const showSatusIfThere = await Order.find({ status: status });

  if (!showSatusIfThere || showSatusIfThere.length === 0) {
    return next(new NotFoundError("No Order Match"));
  }

  appStatus(200, "", { showSatusIfThere, total: showSatusIfThere.length }, res);
});

module.exports = {
  allOrder,
  upDateOrder,
  deleteOrder,
  todayDelivery,
  tomorrowDelivery,
  orderStatusShow,
};
