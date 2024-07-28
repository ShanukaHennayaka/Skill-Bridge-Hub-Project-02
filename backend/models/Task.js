import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  coverImage: { type: String, required: true },
  shortDescription: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  budget: { type: Number, required: true },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  isBidding: { type: Boolean, default: false },
  requiredSkills: { type: [] },
  attachments: { type: [{ type: mongoose.Schema.Types.Mixed }] },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
