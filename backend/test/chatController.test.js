import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";
import * as chatController from "../controller/chatController.js";
import { GetUniqueId } from "../utils/generateUniqueId.js";

describe("Chat Controller", () => {
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

  describe("AddNewMessage", () => {
    it("should add a new message successfully", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        chats: [{ role: "Employer", message: "Test message" }],
      };

      const chat = new Chat({ _id: req.body.id, chat: [] });
      const updatedChat = new Chat({ _id: req.body.id, chat: req.body.chats });

      const chatStub = sinon.stub(Chat, "findById").resolves(chat);
      const updateStub = sinon
        .stub(Chat, "findByIdAndUpdate")
        .resolves(updatedChat);
      const notificationStub = sinon
        .stub(Notification.prototype, "save")
        .resolves();

      await chatController.AddNewMessage(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;

      chatStub.restore();
      updateStub.restore();
      notificationStub.restore();
    });

    it("should handle errors when adding a new message", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        chats: [{ role: "Employer", message: "Test message" }],
      };

      const chatStub = sinon
        .stub(Chat, "findById")
        .rejects(new Error("Find error"));

      await chatController.AddNewMessage(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      chatStub.restore();
    });
  });

  describe("GetChatById", () => {
    it("should get chat by id successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const chat = new Chat({ _id: req.params.id, chat: [] });

      const chatStub = sinon.stub(Chat, "findById").resolves(chat);

      await chatController.GetChatById(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(chat)).to.be.true;
      chatStub.restore();
    });

    it("should handle errors when getting chat by id", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const chatStub = sinon
        .stub(Chat, "findById")
        .rejects(new Error("Find error"));

      await chatController.GetChatById(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      chatStub.restore();
    });
  });
});
