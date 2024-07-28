import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  bidderId: { type: mongoose.Types.ObjectId, required: true },
  ownerId: { type: mongoose.Types.ObjectId, required: true },
  taskId: { type: mongoose.Types.ObjectId, required: true },
  offer: { type: String, required: true },
  note: { type: String, required: true },
  attachments: { type: [{ type: mongoose.Schema.Types.Mixed }] },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: new Date() },
});

const Bid = mongoose.model('Bid',BidSchema);
export default Bid;