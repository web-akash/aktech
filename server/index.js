const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const upload = require("./utils/multer");
const path = require("path");
const routes = require("./routes");
const db = require("./Config/dbconnection");
const passportSetup = require("./Config/googleAuth");
const passport = require("passport");
const session = require("express-session");
const errorHandler = require("./error/errorHandler");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db();

let allowedOrigins = [];

if (process.env.NODE_ENV === "development") {
  allowedOrigins = [`${process.env.SERVER_URL_DEV}`];
} else {
  allowedOrigins = [`http://localhost:5173/`];
}

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/thumbnail", express.static("thumbnail"));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://127.0.0.1:5173");
  }
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
app.use(routes);
app.use(errorHandler);
