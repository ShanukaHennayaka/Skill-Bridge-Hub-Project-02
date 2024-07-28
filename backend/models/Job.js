import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Types.ObjectId, required: true },
  professionalId: { type: mongoose.Types.ObjectId, required: true },
  taskId: { type: mongoose.Types.ObjectId, required: true },
  price: { type: String, required: true },
  acceptedAt: { type: Date, default: new Date() },
  deadline: { type: Date, required: true },
  status: {
    type: [{ type: mongoose.Schema.Types.Mixed }],
    default: [{ status: "Pending", date: new Date(), description: "" }],
  },
  isJobDelivered: { type: Boolean, default: false },
  deliveredDate: { type: Date },
  isEmployerAccepted: { type: Boolean, default: false },
  isPaymentDone: { type: Boolean, default: false },
  deliverables: { type: [{ type: mongoose.Schema.Types.Mixed }], default: [] },
  feedback: { type: mongoose.Schema.Types.Mixed, default: null },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
