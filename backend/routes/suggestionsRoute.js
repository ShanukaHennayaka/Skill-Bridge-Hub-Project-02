import express from "express";
import { SendMailToProfessional } from "../controller/suggestionController.js";


const router = express.Router();

router.post("/sendBidRequestEmail",SendMailToProfessional )

export default router;
