import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";
import { GetUniqueId } from "../utils/generateUniqueId.js";

export async function AddNewMessage(req, res) {
  try {
    const chat = await Chat.findById(req.body.id);
    let newChats = [...chat.chat, ...req.body.chats];
    await Chat.findByIdAndUpdate(req.body.id, { chat: newChats });
    const updatedChat = await Chat.findById(req.body.id);

    if (req.body.chats[0].role === "Employer") {
      await new Notification({
        userId: chat.professionalId,
        message: `You received a new message from JOB-${GetUniqueId(
          chat.jobId + ""
        )}.`,
      }).save();
    } else {
      await new Notification({
        userId: chat.employerId,
        message: `You received a new message from JOB-${GetUniqueId(
          chat.jobId + ""
        )}.`,
      }).save();
    }

    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function GetChatById(req, res) {
  try {
    const chat = await Chat.findById(req.params.id);
    res.status(200).send(chat);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
