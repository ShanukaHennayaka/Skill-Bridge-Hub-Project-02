import User from "../models/User.js";
import sendEmail from "../utils/email.js";
import bcrypt from "bcrypt";

export async function SendRecoverCode(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      userRole: req.body.role,
    });

    if (!user) {
      return res.status(400).send("Invalid User");
    }

    var mailOptions = {
      from: "hubskillbridge@gmail.com",
      to: req.body.email,
      subject: "Change Password Request",
      text: `
Your Verification Code is ${req.body.code}.

Thank you,
Best Regards,
Skill Bridge Hub

            `,
    };

    sendEmail(mailOptions);
    res.status(200).send("Request sent");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function ChangePassword(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      userRole: req.body.role,
    });
    console.log(user)
    console.log("passs",req.body.password);
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.findByIdAndUpdate(user._id, { password: newPassword });

    res.status(200).send("Password changed successfully"); 
  } catch (error) {
    res.status(500).send(error.message);
  }
}
