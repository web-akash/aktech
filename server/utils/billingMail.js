const nodemailer = require("nodemailer");

async function billingMail(email, htmlTemplate) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "contact.weepoka@gmail.com",
      pass: "wnqfrtyojggmxzdv",
    },
  });
  let info = await transporter.sendMail({
    from: email,
    to: "dev.mhakash@gmail.com", // list of receivers
    subject: "Your Web Purchase", // Subject line
    text: "Payment Details:", // plain text body
    html: htmlTemplate, // html body
  });
}

module.exports = billingMail;
