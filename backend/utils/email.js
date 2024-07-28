import nodemailer from 'nodemailer'

export default function sendEmail(mailOptions) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hubskillbridge@gmail.com",
      pass: "aeti jqln rapm wehd",
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
