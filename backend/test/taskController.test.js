import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import User from "../models/User.js";
import * as taskController from "../controller/taskController.js";

describe("Task Controller", () => {
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

  describe("AddNewTask", () => {
    it("should add a new task successfully", async () => {
      req.body = {
        shortDescription: "Test Task",
        userId: new mongoose.Types.ObjectId(),
        budget: 1000,
        mainCategory: "Test Category",
        subCategory: "Test SubCategory",
        location: "Test Location",
        deadline: new Date(),
        description: "Test Description",
        requiredSkills: '["skill1", "skill2"]',
      };

      const taskStub = sinon.stub(Task.prototype, "save").resolves();

      await taskController.AddNewTask(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith("Task created successfully")).to.be.true;
      taskStub.restore();
    });

    it("should handle errors when adding a new task", async () => {
      req.body = {
        shortDescription: "Test Task",
        userId: new mongoose.Types.ObjectId(),
        budget: 1000,
        mainCategory: "Test Category",
        subCategory: "Test SubCategory",
        location: "Test Location",
        deadline: new Date(),
        description: "Test Description",
        requiredSkills: '["skill1", "skill2"]',
      };

      const taskStub = sinon
        .stub(Task.prototype, "save")
        .rejects(new Error("Save error"));

      await taskController.AddNewTask(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: "Save error" })).to.be.true;
      taskStub.restore();
    });
  });

  describe("GetAllTasks", () => {
    it("should get all tasks successfully", async () => {
      const tasks = [
        new Task({ userId: new mongoose.Types.ObjectId() }),
      ];

      const userStub = sinon.stub(User, "findById").resolves(new User());
      const taskStub = sinon.stub(Task, "find").resolves(tasks);

      await taskController.GetAllTasks(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      taskStub.restore();
      userStub.restore();
    });

    it("should handle errors when getting all tasks", async () => {
      const taskStub = sinon
        .stub(Task, "find")
        .rejects(new Error("Find error"));

      await taskController.GetAllTasks(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      taskStub.restore();
    });
  });
});
