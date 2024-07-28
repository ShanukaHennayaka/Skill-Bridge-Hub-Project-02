import express from "express";
import {
  DeleteNotification,
  GetAllUserNotifications,
} from "../controller/notificationController.js";

const router = express.Router();

router.get("/getAllNotifications/:id", GetAllUserNotifications);
router.delete("/deleteNotification/:id", DeleteNotification);

export default router;
