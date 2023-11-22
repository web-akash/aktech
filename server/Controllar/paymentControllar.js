const express = require("express");
const { ObjectId } = require("mongodb");

const SSLCommerzPayment = require("sslcommerz-lts");
const newOrderModel = require("../models/newOrderModel");
const User = require("../models/userModel");
const Theme = require("../models/themesModel");
const store_id = "weero65000f3300f75";
const store_passwd = "weero65000f3300f75@ssl";
const is_live = false;
const path = require("path");
const lib = require("../utils/staticFile");
const billingMail = require("../utils/billingMail");

const paymentConntrollar = async (req, res) => {
  const {
    fullName,
    number,
    email,
    message,
    packagePrice,
    packageName,
    productId,
    category,
  } = req.body;
  const fileO = req.file ? req.file.filename : null;
  console.log(fileO);
  const tranid = new ObjectId().toString();
  const findTheme = await Theme.findById({ _id: productId });
  const mong = await new newOrderModel({
    productId: findTheme._id,
    transitionId: tranid,
    productInfo: message,
    buyerName: fullName,
    buyerEmail: email,
    category: category,
    file: fileO,
    packagePrice: packagePrice,
  }).save();
  console.log(mong);
  const data = {
    total_amount: packagePrice,
    currency: "BDT",
    tran_id: tranid,
    success_url: `https://aktech.onrender.com/api/payment/successproces/${tranid}`,
    fail_url: `https://aktech.onrender.com/api/payment/paymentfail/${tranid}`,
    cancel_url: `https://aktech.onrender.com/api/payment/paymentCancel/${tranid}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: packageName,
    product_category: packageName,
    product_profile: packageName,
    cus_name: fullName,
    cus_email: email,
    cus_add1: message,
    cus_add2: findTheme && findTheme._id.toString(),
    cus_city: category,
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: number,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  await sslcz.init(data).then(async (apiResponse) => {
    console.log(data);
    let GatewayPageUR = apiResponse?.GatewayPageURL;

    res.send({ url: GatewayPageUR, dota: data });
    console.log("Redirecting to: ", GatewayPageUR);
  });
};

// const paymentConntrollar = async (req, res) => {
//   const {
//     fullName,
//     number,
//     email,
//     message,
//     packagePrice,
//     packageName,
//     productId,
//     category,
//   } = req.body;
//   const fileO = req.file ? req.file.filename : null;
//   console.log(fileO);
//   const tranid = new ObjectId().toString();
//   const findTheme = await Theme.findById({ _id: productId });
//   const mong = await new newOrderModel({
//     productId: findTheme._id,
//     transitionId: tranid,
//     productInfo: message,
//     buyerName: fullName,
//     buyerEmail: email,
//     phoneNumber: number,
//     payment: true,
//     category: category,
//     file: fileO,
//     packagePrice: packagePrice,
//   }).save();

//   let htmlTemplate = `
//   <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>AkTech Order Request</title>
// </head>
// <body style="font-family: 'Arial', sans-serif; background-color: #004282; margin: 0; padding: 0;">

//     <div style="max-width: 400px; margin: 20px auto; background-color: #004282; color: #fff; padding: 20px; text-align: center; border-radius: 4px;">

//         <div style="text-align: center;">
//             <h2 style="font-size: 24px; font-weight: bold; margin-top: 10px;">AkTech</h2>
//         </div>

//         <p style="font-size: 24px; color: #e53e3e; margin-top: 10px;">Order Request</p>

//         <p style="font-size: 14px; margin-top: 10px;"><strong>Category:</strong> ${category}</p>
//         <p style="font-size: 14px; margin-top: 10px;"><strong>Message:</strong> ${message}</p>

//         <p style="font-size: 14px; margin-top: 10px;"><strong>Full Name:</strong> ${fullName}</p>
//         <p style="font-size: 14px; margin-top: 10px; color: #fff"><strong>Email:</strong> <a style="color: white"> ${email}</a></p>

//         <p style="font-size: 14px; font-weight: bold; margin-top: 10px;">Payment ID: ${tranid}</p>
//         <p style="font-size: 14px; font-weight: bold; margin-top: 10px;">Amount Paid: ${packagePrice} Taka</p>
//         <p style="font-size: 14px; font-weight: bold; margin-top: 10px;">Delivery Status: ${mong.status}</p>

//         <a href="https://server.AkTech.com/uploads/${fileO}" style="color: #fff; text-decoration: none; display: block; margin-top: 10px; font-size: 16px;">View Attached File</a>

//     </div>

// </body>
// </html>

//   `;

//   await billingMail(email, htmlTemplate);

//   return res.send({
//     url: `http://localhost:5173/paymentSuccess/${tranid}`,
//     dota: mong,
//   });
// };

const success = async (req, res) => {
  let data = req.params.tranid;
  let productsupdate = await newOrderModel.findOneAndUpdate(
    {
      transitionId: data,
    },
    { $set: { payment: true } },
    { new: true }
  );

  const updatedUser = await User.findOneAndUpdate(
    { email: productsupdate.buyerEmail },
    { $push: { orderList: productsupdate._id } },
    { new: true }
  );

  let htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AkTech</title>
  </head>
  <body>
      <div style="width: 100%; max-width: 300px; margin: 0 auto; background-color: #004282; color: #fff; padding: 20px; text-align: center; border-radius: 4px;">
          <div style="text-align: center; ">
             
              <h4 style="font-size: 24px; font-weight: bold; display: inline-block; margin-top: 10px;">AkTech</h4>
          </div>
          <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">Payment Success</p>
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${productsupdate.category}</p>
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${productsupdate.productInfo}</p>
      
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${productsupdate.buyerName}</p>
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${productsupdate.buyerEmail}</p>
          <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">PaymentId: ${productsupdate.transitionId}</p>
          <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">Amount Paid: ${productsupdate.packagePrice}</p>
          <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">Delivery Status: ${productsupdate.status}</p>
          <a href="http://localhost:8000/uploads/${productsupdate.file}" style="color: #fff; text-decoration: none; display: block; margin-top: 10px;">View Attached File</a>
      </div>
  </body>
  </html>
  `;
  let email = productsupdate.buyerEmail;
  billingMail(email, htmlTemplate);

  return res.redirect(
    `https://aktech.onrender.com/paymentSuccess/${req.params.tranid}`
  );
};

const paymentFaild = async (req, res) => {
  let data = req.params.tranid;
  console.log("xxxxxxxxxxx", data);
  const delFile = await newOrderModel.findOne({ transitionId: data });

  await lib.delete(delFile.file);

  let productsupdate = await newOrderModel.findOneAndDelete({
    transitionId: data,
  });
  console.log("suc", productsupdate);
  return res.redirect(
    `https://aktech.onrender.com/paymentfailed/${req.params.tranid}`
  );
};

const paymentCancel = async (req, res) => {
  let data = req.params.tranid;
  const delFile = await newOrderModel.findOne({ transitionId: data });

  await lib.delete(delFile.file, req, res);
  let productsupdate = await newOrderModel.findOneAndDelete({
    transitionId: data,
  });
  console.log("suc", productsupdate);
  res.redirect(
    `https://aktech.onrender.com/paymentCancal/${req.params.tranid}`
  );
};
module.exports = { paymentConntrollar, success, paymentFaild, paymentCancel };
