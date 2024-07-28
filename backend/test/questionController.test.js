import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Question from "../models/Question.js";
import * as questionController from "../controller/questionController.js";

describe("Question Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
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

  describe("AddNewQuestion", () => {
    it("should add a new question successfully", async () => {
      req.body = {
        name: "John Doe",
        email: "johndoe@example.com",
        message: "This is a test message",
      };

      const questionStub = sinon.stub(Question.prototype, "save").resolves();

      await questionController.AddNewQuestion(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Question sent successfully")).to.be.true;
      questionStub.restore();
    });

    it("should handle errors when adding a new question", async () => {
      req.body = {
        name: "John Doe",
        email: "johndoe@example.com",
        message: "This is a test message",
      };

      const questionStub = sinon
        .stub(Question.prototype, "save")
        .rejects(new Error("Save error"));

      await questionController.AddNewQuestion(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Save error")).to.be.true;
      questionStub.restore();
    });
  });

  describe("GetAllQuestions", () => {
    it("should get all questions successfully", async () => {
      const questions = [
        new Question({
          name: "John Doe",
          email: "johndoe@example.com",
          message: "This is a test message",
        }),
      ];

      const questionStub = sinon.stub(Question, "find").resolves(questions);

      await questionController.GetAllQuestions(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(questions)).to.be.true;
      questionStub.restore();
    });

    it("should handle errors when getting all questions", async () => {
      const questionStub = sinon
        .stub(Question, "find")
        .rejects(new Error("Find error"));

      await questionController.GetAllQuestions(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      questionStub.restore();
    });
  });
});
