const userModel = require("../models/userModel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const { ObjectId } = require("mongodb");

async function singup(req, res) {
  const { fullname, email, password, number, confirmPassword } = req.body;
  const existingUser = await userModel.find({ email: email });
  console.log(existingUser);
  if (existingUser.length > 0) {
    return res.json({ error: "email already exists try another email" });
  } else {
    // let otp = otpGenerator.generate(4, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    // });
    function create_UUID() {
      var dt = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      return uuid;
    }

    bcrypt.genSalt(10, function (err, aklogic) {
      bcrypt.hash(password, aklogic, async function (err, hash) {
        console.log(hash);
        let mng = await userModel({
          username: fullname,
          email: email,
          password: hash,
          phoneNumber: number,
          token: create_UUID(),
        });
        mng.save();
        let verifyLink = `http://localhost:8000/api/auth/verify/${mng.token}`;

        sendEmail(email, verifyLink);
        return res.json({ success: "successfully Singup" });
      });
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const findUser = await userModel.find({ email });

  if (findUser.length > 0) {
    bcrypt.compare(password, findUser[0].password, function (err, result) {
      if (result === true) {
        if (findUser[0].verify == true) {
          return res.json({
            success: "Successfully Login",
            data: findUser[0],
          });
        } else {
          return res.json({ error: "Please Verify Your Email" });
        }
      } else {
        return res.json({ error: "Authentication failed" });
      }
    });
  } else {
    return res.json({ error: "Authentication failed" });
  }
}

async function verifyEmail(req, res) {
  let id = req.params.id;
  let findUser = await userModel.find({ token: id });
  console.log(findUser);
  if (findUser.length > 0) {
    await userModel.findOneAndUpdate(
      { token: findUser[0].token },
      { $set: { verify: true } },
      { new: true }
    );
    return res.redirect(`http://localhost:5173/emailverify/${req.params.id}`);
  } else {
    return res.redirect(`http://localhost:5173/errorverify/${req.params.id}`);
  }
}

async function alluser(req, res) {
  let user = await userModel.find({});
  console.log(user);
  res.json(user);
}

module.exports = { singup, login, verifyEmail, alluser };
