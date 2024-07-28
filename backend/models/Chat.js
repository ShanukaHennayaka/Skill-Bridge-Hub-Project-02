import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  employerId: { type: mongoose.Types.ObjectId, required: true },
  professionalId: { type: mongoose.Types.ObjectId, required: true },
  jobId: { type: mongoose.Types.ObjectId, required: true },
  chat: { type: [{ type: mongoose.Schema.Types.Mixed }], default: [] },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
