import express from "express";
import { DeleteUser, GetAllUsers, GetUserById, Login, RegisterNewUser, UpdateUserDetails, UpdateUserStatus, updateVerification } from "../controller/userController.js";
const router  = express.Router();

router.post("/register", RegisterNewUser);
router.post("/login", Login);
router.get("/getUserById/:id", GetUserById)
router.get("/getAllUsers", GetAllUsers)
router.put("/updateUser", UpdateUserDetails)
router.put("/updateVerification", updateVerification)
router.put("/updateUserStatus/:id", UpdateUserStatus);
router.delete("/deleteUser/:id", DeleteUser);

export default router;