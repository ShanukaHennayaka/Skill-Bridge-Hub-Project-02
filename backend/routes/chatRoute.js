import express from "express";
import { AddNewMessage, GetChatById } from "../controller/chatController.js";

const router = express.Router();

router.put("/addNewMessage", AddNewMessage);
router.get("/getChatById/:id", GetChatById)

export default router;
