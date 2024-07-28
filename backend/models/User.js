import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import config from "config";

const UserSchema = new mongoose.Schema({
  uid: { type: String },
  nic: { type: String, required: true },
  userRole: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String },
  skills: { type: [{ type: mongoose.Schema.Types.Mixed }], default:null },
  companyDetails: { type: mongoose.Schema.Types.Mixed },
  description: { type: String },
  joined: { type: Date, default: new Date() },
  isVerified: { type: String, default: "Not Verified" },
  isActive: { type: Boolean, default: true },
  feedback:{ type:Number, default: 0 },
  noOfJobsDone:{ type: Number, default:0}
});
UserSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      role: this.userRole,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", UserSchema);
export default User;
