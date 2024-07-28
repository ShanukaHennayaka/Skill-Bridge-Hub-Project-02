import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import User from "../models/User.js";
import Verification from "../models/Verification.js";
import * as verificationController from "../controller/verificationController.js";

describe("Verification Controller", () => {
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

  describe("AddNewVerification", () => {
    it("should add a new verification successfully", async () => {
      req.body = {
        userId: new mongoose.Types.ObjectId(),
        frontImage: "front_image_url",
        backImage: "back_image_url",
      };

      const verificationStub = sinon
        .stub(Verification.prototype, "save")
        .resolves();
      const userStub = sinon.stub(User, "findByIdAndUpdate").resolves();

      await verificationController.AddNewVerification(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Verification is in progress")).to.be.true;
      verificationStub.restore();
      userStub.restore();
    });

    it("should handle errors when adding a new verification", async () => {
      req.body = {
        userId: new mongoose.Types.ObjectId(),
        frontImage: "front_image_url",
        backImage: "back_image_url",
      };

      const verificationStub = sinon
        .stub(Verification.prototype, "save")
        .rejects(new Error("Save error"));

      await verificationController.AddNewVerification(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Save error")).to.be.true;
      verificationStub.restore();
    });
  });

  describe("GetAllVerifications", () => {
    it("should get all verifications successfully", async () => {
      const verifications = [
        new Verification({
          userId: new mongoose.Types.ObjectId(),
          frontImage: "front_image_url",
          backImage: "back_image_url",
        }),
      ];

      const user = new User({
        username: "testuser",
        email: "testuser@example.com",
      });
      const verificationStub = sinon
        .stub(Verification, "find")
        .resolves(verifications);
      const userStub = sinon.stub(User, "findById").resolves(user);

      await verificationController.GetAllVerifications(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      verificationStub.restore();
      userStub.restore();
    });

    it("should handle errors when getting all verifications", async () => {
      const verificationStub = sinon
        .stub(Verification, "find")
        .rejects(new Error("Find error"));

      await verificationController.GetAllVerifications(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      verificationStub.restore();
    });
  });
});
