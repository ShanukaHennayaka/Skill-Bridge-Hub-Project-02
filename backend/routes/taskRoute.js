import express from "express";
import { AddNewTask, DeleteTaskById, GetAllTasks, GetAllTasksByCategory, GetAllTasksByUser, GetTaskById, UpdateBiddingStatus, UpdateTaskById } from "../controller/taskController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post(
  "/addNewTask",
  upload.fields([{ name: "coverImage" }, { name: "attachments" }]),
  AddNewTask
);
router.put(
  "/updateTask/:id",
  upload.fields([{ name: "coverImage" }, { name: "newAttachments" }]),
  UpdateTaskById
);
router.get("/getAllTasks", GetAllTasks);
router.get("/getTaskById/:id", GetTaskById);
router.get("/getAllTasksByUser/:id", GetAllTasksByUser);
router.get("/getAllTasksByCategory/:category", GetAllTasksByCategory);
router.put("/updateBiddingStatus/:id", UpdateBiddingStatus);
router.delete("/deleteTask/:id", DeleteTaskById)

export default router;
