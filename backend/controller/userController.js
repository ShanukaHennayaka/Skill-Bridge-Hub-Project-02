import User from "../models/User.js";
import bcrypt from "bcrypt";
import { GetUniqueId } from "../utils/generateUniqueId.js";
import Verification from "../models/Verification.js";
import Task from "../models/Task.js";
import Bid from '../models/Bid.js';

export async function RegisterNewUser(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      userRole: req.body.userRole,
      nic: req.body.nic,
    });
    if (user) return res.status(400).send("User already registered");

    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    if (newUser.userRole === "Professional") {
      newUser.uid = "P-" + GetUniqueId(newUser._id.toString());
    } else {
      newUser.uid = "E-" + GetUniqueId(newUser._id.toString());
    }
    await newUser.save();

    res.status(200).send("Your Account has been successfully created");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function Login(req, res) {
  try {
    const { userRole, email, password } = req.body;
    const user = await User.findOne({ email: email, userRole: userRole });

    if (!user) return res.status(400).send("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send("Invalid email or password");
    if (!user.isActive) {
      return res.status(400).send("Your account is Deactivated");
    }

    const token = user.generateAuthToken();
    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function GetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("No user found");
    delete user.password;

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function GetAllUsers(req, res) {
  try {
    const users = await User.find();
    const filteredUsers = users.filter((user) => user.userRole !== "Admin");
    res.status(200).send(filteredUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateVerification(req, res) {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      isVerified: req.body.status,
    });
    await Verification.findByIdAndDelete(req.body.verifyId);
    res.status(200).send("Verification status updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function UpdateUserDetails(req, res) {
  try {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send("User details updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function UpdateUserStatus(req, res) {
  try {
    const user = await User.findById(req.params.id);
    await User.findByIdAndUpdate(req.params.id, { isActive: !user.isActive });
    res
      .status(200)
      .send(`User Account ${user.isActive ? "Deactivated" : "Activated"}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function DeleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ userId: req.params.id });
    // await Bid.
    res.status(200).send("Account Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
