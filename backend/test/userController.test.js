// test/userController.test.js
import { expect } from "chai";
import sinon from "sinon";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { RegisterNewUser, Login } from "../controller/userController.js";

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        nic: "123456789V",
        userRole: "Admin",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should register a new user", async () => {
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcrypt, "hash").resolves("hashedPassword");
    sinon.stub(User.prototype, "save").resolvesThis();

    await RegisterNewUser(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWith("Your Account has been successfully created")).to
      .be.true;
  });

  it("should not register an already registered user", async () => {
    sinon.stub(User, "findOne").resolves(new User(req.body));

    await RegisterNewUser(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.send.calledWith("User already registered")).to.be.true;
  });

  it("should login a user with valid credentials", async () => {
    const user = new User(req.body);
    sinon.stub(User, "findOne").resolves(user);
    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(user, "generateAuthToken").returns("fakeToken");

    await Login(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.send.calledWith("fakeToken")).to.be.true;
  });

  it("should not login a user with invalid credentials", async () => {
    sinon.stub(User, "findOne").resolves(null);

    await Login(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.send.calledWith("Invalid email or password")).to.be.true;
  });
});
