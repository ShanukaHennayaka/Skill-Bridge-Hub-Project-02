import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  frontImage: { type: String, required: true },
  backImage: { type: String, required: true },
});

const Verification = mongoose.model('Verification', VerificationSchema);
export default Verification;