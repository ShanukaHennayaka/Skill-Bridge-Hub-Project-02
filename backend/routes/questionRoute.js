import express from "express";
import { AddNewQuestion, GetAllQuestions } from "../controller/questionController.js";

const router = express.Router();

router.post("/addNewQuestion", AddNewQuestion);
router.get("/allQuestions", GetAllQuestions)

export default router;
