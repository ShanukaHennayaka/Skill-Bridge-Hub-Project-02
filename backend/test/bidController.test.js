import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";
import * as bidController from "../controller/bidController.js";

describe("Bid Controller", () => {
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

  describe("AddNewBid", () => {
    it("should add a new bid successfully", async () => {
      req.body = {
        bidderId: new mongoose.Types.ObjectId(),
        ownerId: new mongoose.Types.ObjectId(),
        taskId: new mongoose.Types.ObjectId(),
        offer: "1000",
        note: "Test Note",
      };

      const bidStub = sinon.stub(Bid.prototype, "save").resolves();

      await bidController.AddNewBid(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Bid Placed successfully")).to.be.true;
      bidStub.restore();
    });

    // it("should handle errors when adding a new bid", async () => {
    //   req.body = {
    //     bidderId: new mongoose.Types.ObjectId(),
    //     ownerId: new mongoose.Types.ObjectId(),
    //     taskId: new mongoose.Types.ObjectId(),
 
    //     note: "Test Note",
    //   };

    //   const bidStub = sinon
    //     .stub(Bid.prototype, "save")
    //     .rejects(new Error("Save error"));

    //   await bidController.AddNewBid(req, res, next);

    //   expect(res.status.calledWith(500)).to.be.true;
    //   expect(res.send.calledWith({ message: "Save error" })).to.be.true;
    //   bidStub.restore();
    // });
  });

  describe("GetAllBidsByEmployer", () => {
    it("should get all bids by employer successfully", async () => {
      const bids = [new Bid({ ownerId: new mongoose.Types.ObjectId() })];

      const bidStub = sinon.stub(Bid, "find").resolves(bids);

      await bidController.GetAllBidsByEmployer(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      bidStub.restore();
    });

    it("should handle errors when getting all bids by employer", async () => {
      const bidStub = sinon.stub(Bid, "find").rejects(new Error("Find error"));

      await bidController.GetAllBidsByEmployer(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      bidStub.restore();
    });
  });

  describe("GetAllBidsByProfessional", () => {
    it("should get all bids by professional successfully", async () => {
      const bids = [new Bid({ bidderId: new mongoose.Types.ObjectId() })];

      const bidStub = sinon.stub(Bid, "find").resolves(bids);

      await bidController.GetAllBidsByProfessional(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      bidStub.restore();
    });

    it("should handle errors when getting all bids by professional", async () => {
      const bidStub = sinon.stub(Bid, "find").rejects(new Error("Find error"));

      await bidController.GetAllBidsByProfessional(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      bidStub.restore();
    });
  });

  describe("GetAllBidsByTask", () => {
    // it("should get all bids by task successfully", async () => {
    //     const id = new mongoose.Types.ObjectId();
    //     req.params.id = id
    //   const bids = [new Bid({ taskId: id })];

    //   const bidStub = sinon.stub(Bid, "find").resolves(bids);

    //   await bidController.GetAllBidsByTask(req, res, next);

    //   expect(res.status.calledWith(200)).to.be.true;
    //   bidStub.restore();
    // });

    it("should handle errors when getting all bids by task", async () => {
      const bidStub = sinon.stub(Bid, "find").rejects(new Error("Find error"));

      await bidController.GetAllBidsByTask(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Find error")).to.be.true;
      bidStub.restore();
    });
  });

  describe("UpdateBidStatus", () => {
    it("should update bid status successfully", async () => {
      req.body = {
        id: new mongoose.Types.ObjectId(),
        status: "Rejected",
      };

      const bid = new Bid({ status: "Pending" });
      const bidStub = sinon.stub(Bid, "findByIdAndUpdate").resolves(bid);

      await bidController.UpdateBidStatus(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      bidStub.restore();
    });

    // it("should handle errors when updating bid status", async () => {
    //   req.body = {
    //     id: new mongoose.Types.ObjectId(),
    //     status: "Accepted",
    //   };

    //   const bidStub = sinon
    //     .stub(Bid, "findByIdAndUpdate")
    //     .rejects(new Error("Update error"));

    //   await bidController.UpdateBidStatus(req, res, next);

    //   expect(res.status.calledWith(500)).to.be.true;
    //   expect(res.send.calledWith("Update error")).to.be.true;
    //   bidStub.restore();
    // });
  });

  describe("DeleteBidById", () => {
    it("should delete bid by id successfully", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const bidStub = sinon.stub(Bid, "findByIdAndDelete").resolves();

      await bidController.DeleteBidById(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Bid deleted successfully")).to.be.true;
      bidStub.restore();
    });

    it("should handle errors when deleting bid by id", async () => {
      req.params.id = new mongoose.Types.ObjectId();

      const bidStub = sinon
        .stub(Bid, "findByIdAndDelete")
        .rejects(new Error("Delete error"));

      await bidController.DeleteBidById(req, res, next);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith("Delete error")).to.be.true;
      bidStub.restore();
    });
  });
});
