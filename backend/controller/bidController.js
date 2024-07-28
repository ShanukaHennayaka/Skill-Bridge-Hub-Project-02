import Job from "../models/Job.js";
import Bid from "../models/Bid.js";
import Chat from "../models/Chat.js";
import Task from "../models/Task.js";
import uploadToCloudinary from "../utils/cloudinaryImageUpload.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { GetUniqueId } from "../utils/generateUniqueId.js";

export async function AddNewBid(req, res) {
  try {
    const { bidderId, ownerId, taskId, offer, note } = req.body;

    const bid = await Bid.findOne({ bidderId: bidderId, taskId: taskId });

    if (bid !== null) {
      return res.status(400).send("Already Placed a Bid");
    }

    const attachments = req.files.attachments || [];

    const attachmentUploads = await Promise.all(
      attachments.map((file) => {
        const resourceType = file.mimetype.includes("image") ? "image" : "pdf";
        return uploadToCloudinary(file.buffer, {
          resource_type: "image",
        });
      })
    );

    const formattedAttachments = attachmentUploads.map((upload) => ({
      name: upload.original_filename,
      url: upload.secure_url,
      type: upload.resource_type,
    }));

    const newBid = new Bid({
      bidderId,
      ownerId,
      taskId,
      offer,
      note,
      attachments: formattedAttachments,
    });
    await newBid.save();

    await new Notification({
      userId: ownerId,
      message: `Your task (TSK-${GetUniqueId(taskId + "")}) has a new bid.`,
    }).save();

    res.status(200).send("Bid Placed successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function GetAllBidsByEmployer(req, res) {
  try {
    const bids = await Bid.find({ ownerId: req.params.id });
    res.status(200).send(bids);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function GetAllBidsByTask(req, res) {
  try {
    const bids = await Bid.find({ taskId: req.params.id });
    const bidsWithUser = await Promise.all(
      bids.map(async (bid) => {
        let user = await User.findById(bid.bidderId);
        delete user.password;
        const bidData = bid.toObject();
        return { ...bidData, user };
      })
    );
    res.status(200).send(bidsWithUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function GetAllBidsByProfessional(req, res) {
  try {
    const bids = await Bid.find({ bidderId: req.params.id });
    res.status(200).send(bids);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function UpdateBidStatus(req, res) {
  try {
    if (req.body.status === "Accepted") {
      const bid = await Bid.findById(req.body.id);
      const task = await Task.findById(bid.taskId);

      const newJob = new Job({
        employerId: bid.ownerId,
        professionalId: bid.bidderId,
        taskId: bid.taskId,
        price: bid.offer,
        deadline: task.deadline,
      });
      await newJob.save();

      const newChat = new Chat({
        employerId: bid.ownerId,
        professionalId: bid.bidderId,
        jobId: newJob._id,
      });
      await newChat.save();

      await Task.findByIdAndUpdate(task._id, {isBidding:false})

      await new Notification({
        userId: bid.bidderId,
        message: `Your bid on task TSK-${GetUniqueId(bid.taskId + "")} is accepted.`,
      }).save();
    }

    await Bid.findByIdAndUpdate(req.body.id, { status: req.body.status });
    res.status(200).send("Bid status updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function DeleteBidById(req, res){
  try {
    await Bid.findByIdAndDelete(req.params.id);
    res.status(200).send("Bid deleted successfully");
  } catch (error) {
    res.status(500).send(error.message)
  }
}
