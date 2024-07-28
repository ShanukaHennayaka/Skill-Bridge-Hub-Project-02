import Notification from "../models/Notification.js";

export async function GetAllUserNotifications(req, res) {
  try {
    const notifications = await Notification.find({
      userId: req.params.id,
    });
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function DeleteNotification(req, res) {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).send("Notification deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
}