import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  sendAt: { type: Date, default: new Date() },
});

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
