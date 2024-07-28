import Job from "../models/Job.js";
import Chat from "../models/Chat.js";
import uploadToCloudinary from "../utils/cloudinaryImageUpload.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { GetUniqueId } from "../utils/generateUniqueId.js";

export async function GetAllEmployerJobs(req, res) {
  try {
    const jobs = await Job.find({ employerId: req.params.id });
    const jobWithChat = await Promise.all(
      jobs.map(async (job) => {
        const chat = await Chat.findOne({ jobId: job._id });
        const jobData = job.toObject();
        return { ...jobData, chat };
      })
    );
    res.status(200).send(jobWithChat);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function GetAllProfessionalJobs(req, res) {
  try {
    const jobs = await Job.find({ professionalId: req.params.id });
    const jobWithChat = await Promise.all(
      jobs.map(async (job) => {
        const chat = await Chat.findOne({ jobId: job._id });
        const jobData = job.toObject();
        return { ...jobData, chat };
      })
    );
    res.status(200).send(jobWithChat);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function UpdateJobStatus(req, res) {
  try {
    const job = await Job.findById(req.body.id);
    const newStatus = [...job.status, req.body.newStatus];
    await Job.findByIdAndUpdate(req.body.id, { status: newStatus });

    const updatedJob = await Job.findById(req.body.id);
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function DeliverJob(req, res) {
  try {
    const { jobId, description } = req.body;
    const attachments = req.files.attachments || [];

    const attachmentUploads = await Promise.all(
      attachments.map((file) => {
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

    const job = await Job.findById(jobId);
    const newStatus = [
      ...job.status,
      { status: "Job Delivered", description: description, date: new Date() },
      {
        status: "Review Pending",
        description: "Employer need to review and accept.",
        date: new Date(),
      },
    ];

    await new Notification({
      userId: job.employerId,
      message: `JOB-${GetUniqueId(job._id + "")} has delivered. `,
    }).save();

    await Job.findByIdAndUpdate(jobId, {
      isJobDelivered: true,
      deliveredDate: new Date(),
      deliverables: formattedAttachments,
      status: newStatus,
    });

    res.status(200).send("Job Delivered and Sent for Review");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function AcceptJob(req, res) {
  try {
    const job = await Job.findById(req.body.id);
    const newStatus = [
      ...job.status,
      {
        status: "Review Complete",
        description: req.body.description,
        date: new Date(),
      },
      {
        status: "Payment Pending",
        description: "Employer needs to make the payment",
        date: new Date(),
      },
    ];
    await new Notification({
      userId: job.professionalId,
      message: `JOB-${GetUniqueId(job._id + "")} has reviewed and accepted. `,
    }).save();
    await Job.findByIdAndUpdate(req.body.id, {
      status: newStatus,
      isEmployerAccepted: true,
    });

    const updatedJob = await Job.findById(req.body.id);
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function MakePayment(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    const newStatus = [
      ...job.status,
      {
        status: "Payment Complete",
        description: "Job payment is completed.",
        date: new Date(),
      },
      {
        status: "Job Finished",
        description: "Job is completed.",
        date: new Date(),
      },
    ];

    await new Notification({
      userId: job.professionalId,
      message: `JOB-${GetUniqueId(job._id + "")} payment is complete.`,
    }).save();

    await Job.findByIdAndUpdate(req.params.id, {
      status: newStatus,
      isPaymentDone: true,
    });

    const updatedJob = await Job.findById(req.params.id);
    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function GiveFeedback(req, res) {
  try {
    const { id, professionalId, rating, feedback, overall } = req.body;
    const newFeedback = {
      rating: rating,
      overall: overall,
      feedback: feedback,
    };

    await Job.findByIdAndUpdate(id, { feedback: newFeedback });
    const user = await User.findById(professionalId);
    await User.findByIdAndUpdate(professionalId, {
      feedback: (parseFloat(user.feedback) + parseFloat(overall)) / 2.0,
      noOfJobsDone: user.noOfJobsDone + 1,
    });

    const updatedJob = await Job.findById(id);
    await new Notification({
      userId: updatedJob.professionalId,
      message: `You have given a rating for JOB-${GetUniqueId(
        updatedJob._id + ""
      )}.`,
    }).save();

    res.status(200).send(updatedJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
