import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import * as jobController from "../controller/jobController.js";
import uploadToCloudinary from "../utils/cloudinaryImageUpload.js";

describe("Job Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      files: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GetAllEmployerJobs", () => {
    it("should get all jobs for employer successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const jobs = [new Job({ employerId: req.params.id })];

      const chatStub = sinon.stub(Chat, "findOne").resolves(new Chat());
      const jobStub = sinon.stub(Job, "find").resolves(jobs);

      await jobController.GetAllEmployerJobs(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      chatStub.restore();
    });

    it("should handle errors when getting all jobs for employer", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const jobStub = sinon.stub(Job, "find").rejects(new Error("Find error"));

      await jobController.GetAllEmployerJobs(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      jobStub.restore();
    });
  });

  describe("GetAllProfessionalJobs", () => {
    it("should get all jobs for professional successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const jobs = [new Job({ professionalId: req.params.id })];

      const chatStub = sinon.stub(Chat, "findOne").resolves(new Chat());
      const jobStub = sinon.stub(Job, "find").resolves(jobs);

      await jobController.GetAllProfessionalJobs(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      chatStub.restore();
    });

    it("should handle errors when getting all jobs for professional", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const jobStub = sinon.stub(Job, "find").rejects(new Error("Find error"));

      await jobController.GetAllProfessionalJobs(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      jobStub.restore();
    });
  });

  describe("UpdateJobStatus", () => {
    it("should update job status successfully", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        newStatus: {
          status: "Completed",
          date: new Date(),
          description: "Job completed",
        },
      };

      const job = new Job({
        status: [{ status: "Pending", date: new Date(), description: "" }],
      });
      const jobStub = sinon.stub(Job, "findById").resolves(job);
      const updateStub = sinon.stub(Job, "findByIdAndUpdate").resolves(job);

      await jobController.UpdateJobStatus(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      updateStub.restore();
    });

    it("should handle errors when updating job status", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        newStatus: {
          status: "Completed",
          date: new Date(),
          description: "Job completed",
        },
      };

      const jobStub = sinon
        .stub(Job, "findByIdAndUpdate")
        .rejects(new Error("Update error"));

      await jobController.UpdateJobStatus(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      jobStub.restore();
    });
  });

  describe("DeliverJob", () => {
    it("should deliver job successfully", async () => {
      req.body = {
        jobId: new mongoose.Types.ObjectId(),
        description: "Job deliverables",
      };

      const job = new Job();
      const jobStub = sinon.stub(Job, "findById").resolves(job);
      const updateStub = sinon.stub(Job, "findByIdAndUpdate").resolves(job);
      const notificationStub = sinon
        .stub(Notification.prototype, "save")
        .resolves();

      await jobController.DeliverJob(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      updateStub.restore();
      notificationStub.restore();
    });

    it("should handle errors when delivering job", async () => {
      req.body = {
        jobId: new mongoose.Types.ObjectId(),
        description: "Job deliverables",
      };

      await jobController.DeliverJob(req, res, next);
      expect(res.status.calledWith(500)).to.be.true;
    });
  });

  describe("AcceptJob", () => {
    it("should accept job successfully", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        description: "Job review completed",
      };

      const job = new Job();
      const jobStub = sinon.stub(Job, "findById").resolves(job);
      const updateStub = sinon.stub(Job, "findByIdAndUpdate").resolves(job);
      const notificationStub = sinon
        .stub(Notification.prototype, "save")
        .resolves();

      await jobController.AcceptJob(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      updateStub.restore();
      notificationStub.restore();
    });

    it("should handle errors when accepting job", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        description: "Job review completed",
      };

      const jobStub = sinon
        .stub(Job, "findByIdAndUpdate")
        .rejects(new Error("Accept error"));

      await jobController.AcceptJob(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      jobStub.restore();
    });
  });

  describe("MakePayment", () => {
    it("should make payment successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const job = new Job();
      const jobStub = sinon.stub(Job, "findById").resolves(job);
      const updateStub = sinon.stub(Job, "findByIdAndUpdate").resolves(job);
      const notificationStub = sinon
        .stub(Notification.prototype, "save")
        .resolves();

      await jobController.MakePayment(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      jobStub.restore();
      updateStub.restore();
      notificationStub.restore();
    });

    it("should handle errors when making payment", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const jobStub = sinon
        .stub(Job, "findByIdAndUpdate")
        .rejects(new Error("Payment error"));

      await jobController.MakePayment(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      jobStub.restore();
    });
  });

  describe("GiveFeedback", () => {
    // it("should give feedback successfully", async () => {
    //   const userId = new mongoose.Types.ObjectId();
    //   const jobId = new mongoose.Types.ObjectId();
    //   req.body = {
    //     id: jobId ,
    //     professionalId: userId,
    //     rating: 4,
    //     feedback: "Good job",
    //     overall: 4.5,
    //   };

    //   const job = {
    //     _id: jobId ,
    //     professionalId: userId,
    //     rating: 4,
    //     feedback: "Good job",
    //     overall: 4.5,
    //   };
    //   const user = { _id: userId , noOfJobsDone:1, feedback: 2.3};
    //   const jobStub = sinon.stub(Job, "findByIdAndUpdate").resolves(job);
    //   const userStub = sinon.stub(User, "findById").resolves(user);
    //   const userUpdateStub = sinon
    //     .stub(User, "findByIdAndUpdate")
    //     .resolves(user);
    //   const notificationStub = sinon
    //     .stub(Notification.prototype, "save")
    //     .resolves();

    //   await jobController.GiveFeedback(req, res, next);

    //   expect(res.status.calledWith(200)).to.be.true;
    //   jobStub.restore();
    //   userStub.restore();
    //   userUpdateStub.restore();
    //   notificationStub.restore();
    // });

    it("should handle errors when giving feedback", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        professionalId: new mongoose.Types.ObjectId(),
        rating: 4,
        feedback: "Good job",
        overall: 4.5,
      };

      const jobStub = sinon
        .stub(Job, "findByIdAndUpdate")
        .rejects(new Error("Feedback error"));

      await jobController.GiveFeedback(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Feedback error")).to.be.true;
      jobStub.restore();
    });
  });
});
