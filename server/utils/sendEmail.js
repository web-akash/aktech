const nodemailer = require("nodemailer");

async function sendEmail(email, link) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "jexpert82@gmail.com",
      pass: "fbkkrpstkntqshqh",
    },
  });

  const info = await transporter.sendMail({
    from: 'OTP" <dev.mhakash@gmail.com>',
    to: email,
    subject: "Email Verification Weepoka",
    text: "Email Verify Link Code ",
    html: `Your Verify Link : ${link}`,
  });
}

module.exports = sendEmail;
