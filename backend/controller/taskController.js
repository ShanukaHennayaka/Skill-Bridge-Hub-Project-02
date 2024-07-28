import Task from "../models/Task.js";
import User from "../models/User.js";
import uploadToCloudinary from "../utils/cloudinaryImageUpload.js";
import Bid from "../models/Bid.js";

export async function AddNewTask(req, res) {
  try {
    const {
      shortDescription,
      userId,
      budget,
      mainCategory,
      subCategory,
      location,
      deadline,
      description,
      requiredSkills,
    } = req.body;
    const coverImage = req.files.coverImage ? req.files.coverImage[0] : null;
    const attachments = req.files.attachments || [];

    let coverImageUrl = "";
    if (coverImage) {
      const coverImageUpload = await uploadToCloudinary(coverImage.buffer, {
        resource_type: "image",
      });
      coverImageUrl = coverImageUpload.secure_url;
    }

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

    const newTask = new Task({
      userId: userId,
      coverImage: coverImageUrl,
      shortDescription,
      budget,
      deadline,
      mainCategory,
      subCategory,
      location,
      description,
      requiredSkills: JSON.parse(requiredSkills),
      attachments: formattedAttachments,
    });

    await newTask.save();

    res.status(201).send("Task created successfully");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ message: err.message });
  }
}
export async function GetAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    const taskWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.findById(task.userId);
        let taskData = task.toObject();
        delete task.userId;
        return { ...taskData, user };
      })
    );
    res.status(200).send(taskWithUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function GetAllTasksByUser(req, res) {
  try {
    const tasks = await Task.find({ userId: req.params.id });

    const taskWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.findById(task.userId);
        let taskData = task.toObject();
        delete task.userId;
        return { ...taskData, user };
      })
    );
    res.status(200).send(taskWithUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function GetAllTasksByCategory(req, res) {
  try {
    const tasks = await Task.find({ mainCategory: req.params.category });

    const taskWithUser = await Promise.all(
      tasks.map(async (task) => {
        const user = await User.findById(task.userId);
        let taskData = task.toObject();
        delete task.userId;
        return { ...taskData, user };
      })
    );
    res.status(200).send(taskWithUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function GetTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(task.userId);

    const taskData = task.toObject();
    delete taskData.userId;

    const professionals = await User.find({ userRole: "Professional" });

    const requiredSkillsArray = task.requiredSkills.map((skill) =>
      skill.toLowerCase()
    );
    const scoredProfessionals = professionals.map((professional) => {
      const matchingSkillsCount = professional.skills
        .map((skill) => skill.toLowerCase())
        .filter((skill) => requiredSkillsArray.includes(skill)).length;
      return {
        ...professional.toObject(),
        matchingScore: matchingSkillsCount,
      };
    });

    console.log(scoredProfessionals);

    const finalizedProfessionals = scoredProfessionals
      .filter((s) => s.matchingScore > 0)
      .sort((a, b) => {
        if (b.matchingScore === a.matchingScore) {
          return b.feedback - a.feedback;
        }
        return b.matchingScore - a.matchingScore;
      });
      
    let taskWithUser = {
      ...taskData,
      user,
      suggestions: finalizedProfessionals,
    };
    res.status(200).send(taskWithUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
export async function UpdateBiddingStatus(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    await Task.findByIdAndUpdate(req.params.id, { isBidding: !task.isBidding });
    res.status(200).send(task.isBidding ? "Bidding Closed" : "Bidding Opened");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function UpdateTaskById(req, res) {
  try {
    const {
      shortDescription,
      budget,
      mainCategory,
      subCategory,
      location,
      deadline,
      description,
      requiredSkills,
      oldAttachments,
    } = req.body;
    const coverImage = req.files.coverImage ? req.files.coverImage[0] : null;
    const newAttachments = req.files.newAttachments || [];

    let coverImageUrl = "";
    if (coverImage) {
      const coverImageUpload = await uploadToCloudinary(coverImage.buffer, {
        resource_type: "image",
      });
      coverImageUrl = coverImageUpload.secure_url;
    }

    const newAttachmentUploads = await Promise.all(
      newAttachments.map((file) => {
        const resourceType = file.mimetype.includes("image") ? "image" : "pdf";
        return uploadToCloudinary(file.buffer, {
          resource_type: "image",
        });
      })
    );
    const formattedNewAttachments = newAttachmentUploads.map((upload) => ({
      name: upload.original_filename,
      url: upload.secure_url,
      type: upload.resource_type,
    }));

    let allAttachments = JSON.parse(oldAttachments);
    allAttachments = [...allAttachments, ...formattedNewAttachments];

    const task = await Task.findById(req.params.id);

    await Task.findByIdAndUpdate(req.params.id, {
      coverImage: coverImageUrl !== "" ? coverImageUrl : task.coverImage,
      shortDescription,
      budget,
      deadline,
      mainCategory,
      subCategory,
      location,
      description,
      requiredSkills: JSON.parse(requiredSkills),
      attachments: allAttachments,
    });
    res.status(200).send("Task Updated Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function DeleteTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    await Task.findByIdAndDelete(req.params.id);
    await Bid.deleteMany({ taskId: task._id });

    res.status(200).send("Task deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
