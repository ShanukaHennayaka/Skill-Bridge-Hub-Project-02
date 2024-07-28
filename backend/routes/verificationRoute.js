import express from "express";
import {
  AddNewVerification,
  GetAllVerifications,
} from "../controller/verificationController.js";

const router = express.Router();

router.post("/addNewVerification", AddNewVerification);
router.get("/getAllVerifications", GetAllVerifications);

export default router;
