import Question from "../models/Question.js";

export async function AddNewQuestion(req, res) {
 try {
   await new Question(req.body).save();
   res.status(200).send("Question sent successfully");
 } catch (error) {
  res.status(500).send(error.message);
 }
}

export async function GetAllQuestions(req, res) {
  try {
    const allQuestions = await Question.find();
    res.status(200).send(allQuestions);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
