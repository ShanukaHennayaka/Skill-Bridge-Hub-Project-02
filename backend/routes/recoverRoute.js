import express from "express";
import { ChangePassword, SendRecoverCode } from "../controller/recoveryController.js";


const router = express.Router();

router.post("/sendVerificationCode", SendRecoverCode);
router.post("/changePassword", ChangePassword);


export default router;
