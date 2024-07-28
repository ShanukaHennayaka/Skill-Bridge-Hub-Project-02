import sendEmail from "../utils/email.js";

export async function SendMailToProfessional(req, res) {
  const { email, taskId, budget, name, userId, description, deadline } =
    req.body;
  var mailOptions = {
    from: "hubskillbridge@gmail.com",
    to: email,
    subject: "Bid Request for " + taskId,
    text: `
  Dear ${name} (${userId}),

  We are happy to inform you that you have been suggested for the task with the following information.

  Task ID: ${taskId}
  Budget: ${budget.toLocaleString("en-US", {
    style: "currency",
    currency: "LKR",
  })}
  Deadline: ${deadline}
  Short Description: ${description}

  Please visit for more information about this task.

  Thank you,
  Best Regards,
  Skill Bridge Hub

  `,
  };

  sendEmail(mailOptions);
  res.status(200).send("Request sent");
}
