import express from "express";
import multer from "multer";
import {
  AddNewBid,
  DeleteBidById,
  GetAllBidsByEmployer,
  GetAllBidsByProfessional,
  GetAllBidsByTask,
  UpdateBidStatus,
} from "../controller/bidController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addNewBid", upload.fields([{ name: "attachments" }]), AddNewBid);
router.get("/getAllBidsByEmployer/:id", GetAllBidsByEmployer);
router.get("/getAllBidsByTask/:id", GetAllBidsByTask);
router.get("/getAllBidsByProfessional/:id", GetAllBidsByProfessional);
router.put("/updateBidStatus", UpdateBidStatus);
router.delete("/deleteBid/:id", DeleteBidById);

export default router;
