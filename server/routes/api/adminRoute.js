const express = require("express");
const _ = express.Router();
const {
  allOrder,
  upDateOrder,
  deleteOrder,
  todayDelivery,
  tomorrowDelivery,
  orderStatusShow,
} = require("../../Controllar/admin/orderUpdate");

_.get("/order", allOrder); // admin view all order // 5/11
_.post("/order-update/:id", upDateOrder); // update orderDate and status //5/11
_.delete("/order/:id", deleteOrder); // admin can delete customer order//6/11
_.get("/delivery-today", todayDelivery); // admin can see aj-ker delivery and total //7/11
_.get("/delivery-tomorrow", tomorrowDelivery); // admin can see agamikaler delivery and total//7/11
_.post("/status", orderStatusShow); // admin can see status of order //7/11
module.exports = _;
