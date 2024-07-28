import { expect } from "chai";
import User from "../models/User.js";

describe("User Model", () => {
  it("should create a user with required fields", async () => {
    const user = new User({
      nic: "123456789V",
      userRole: "Admin",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    const savedUser = await user.save();
    expect(savedUser._id).to.exist;
    expect(savedUser.email).to.equal("john@example.com");
  });

  it("should not create a user without required fields", async () => {
    const user = new User({});
    try {
      await user.save();
    } catch (error) {
      expect(error).to.exist;
    }
  });
});
