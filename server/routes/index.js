const express = require("express");
const _ = express.Router();
const mainroutes = require("./api");

_.use("/api", mainroutes);
const api = process.env.BASE_URL;
// _.use(mainroutes, (req, res) => {
//   const method = req.method;
//   //   const endpoint = req.originalUrl;
//   //   const baseUrl = req.baseUrl;
//   //   console.log(req.route);
//   //   console.log(req.protocol);
//   //   console.dir(req.stale);
//   //   console.dir(req.ip);
//   //   console.log(req.hostname);
//   // console.log(req.res) // all method included
//   console.log(req.secure);

//   res.send(
//     `API not found.
//       Method: ${method},
//       Host: ${process.env.SERVER_URL},
//       Base: ${api},
//       Endpoint: ${req.path}`
//   );
// });
module.exports = _;
