import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import * as notificationController from "../controller/notificationController.js";

describe("Notification Controller", () => {
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

  describe("GetAllUserNotifications", () => {
    it("should get all notifications for user successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const notifications = [
        new Notification({ userId: req.params.id, message: "Test message" }),
      ];

      const notificationStub = sinon
        .stub(Notification, "find")
        .resolves(notifications);

      await notificationController.GetAllUserNotifications(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(notifications)).to.be.true;
      notificationStub.restore();
    });

    it("should handle errors when getting all notifications for user", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const notificationStub = sinon
        .stub(Notification, "find")
        .rejects(new Error("Find error"));

      await notificationController.GetAllUserNotifications(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      notificationStub.restore();
    });
  });

  describe("DeleteNotification", () => {
    it("should delete notification successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const notificationStub = sinon
        .stub(Notification, "findByIdAndDelete")
        .resolves();

      await notificationController.DeleteNotification(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Notification deleted")).to.be.true;
      notificationStub.restore();
    });

    it("should handle errors when deleting notification", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const notificationStub = sinon
        .stub(Notification, "findByIdAndDelete")
        .rejects(new Error("Delete error"));

      await notificationController.DeleteNotification(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Delete error")).to.be.true;
      notificationStub.restore();
    });
  });
});
