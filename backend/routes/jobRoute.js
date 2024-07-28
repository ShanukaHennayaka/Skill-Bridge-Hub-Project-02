import express from "express";
import {
  AcceptJob,
  DeliverJob,
  GetAllEmployerJobs,
  GetAllProfessionalJobs,
  GiveFeedback,
  MakePayment,
  UpdateJobStatus,
} from "../controller/jobController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getAllEmployerJobs/:id", GetAllEmployerJobs);
router.get("/getAllProfessionalJobs/:id", GetAllProfessionalJobs);
router.put("/updateJobStatus", UpdateJobStatus);
router.put("/deliverJob", upload.fields([{ name: "attachments" }]), DeliverJob);
router.put("/acceptJob", AcceptJob);
router.put("/payment/:id", MakePayment);
router.put("/giveFeedback", GiveFeedback);

export default router;
