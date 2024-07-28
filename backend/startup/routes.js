import bodyParser from "body-parser";
import cors from "cors";
import user from "../routes/userRoute.js";
import verification from "../routes/verificationRoute.js";
import task from "../routes/taskRoute.js";
import bid from "../routes/bidRoute.js";
import job from "../routes/jobRoute.js";
import chat from "../routes/chatRoute.js"
import suggestion from "../routes/suggestionsRoute.js"
import notification from "../routes/notificationRoute.js"
import question from "../routes/questionRoute.js"
import recover from "../routes/recoverRoute.js"

export default function (app) {
  app.use(cors());
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

  app.use("/api/v1/user", user);
  app.use("/api/v1/verification", verification);
  app.use("/api/v1/task", task);
  app.use("/api/v1/bid", bid);
  app.use("/api/v1/job", job);
  app.use("/api/v1/chat", chat);
  app.use("/api/v1/suggestion", suggestion);
  app.use("/api/v1/notification", notification);
  app.use("/api/v1/question", question);
  app.use("/api/v1/recover", recover);
}
