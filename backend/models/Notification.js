import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  message:{ type:String, required: true},
  sendAt:{type: Date, default: new Date()}
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
