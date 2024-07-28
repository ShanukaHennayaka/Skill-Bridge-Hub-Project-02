import User from "../models/User.js";
import Verification from "../models/Verification.js";
import { GetUniqueId } from "../utils/generateUniqueId.js";

export async function AddNewVerification(req, res) {
  try {
    const newVerification = new Verification(req.body);
    await newVerification.save();

    await User.findByIdAndUpdate(req.body.userId, { isVerified: "Pending" });

    res.status(200).send("Verification is in progress");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function GetAllVerifications(req, res) {
  try {
    const verifications = await Verification.find();
    const verificationWithUser = await Promise.all(
      verifications.map(async (verification) => {
        const user = await User.findById(verification.userId);
        if (user !== null) {
          let userData = user.toObject();
          delete userData._id;
          delete userData.password;
          let verificationData = verification.toObject();
          verificationData.vid = GetUniqueId(verificationData._id + "");

          return { ...verificationData, ...userData };
        }
        return null;
      })
    );
    let filteredVerifications = verificationWithUser.filter((v) => v !== null);
    res.status(200).send(filteredVerifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
