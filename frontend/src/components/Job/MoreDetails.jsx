import React, { useEffect, useState } from "react";
import { GetUniqueId } from "../../service/commonServices";
import { formatDate } from "date-fns";
import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/colors";
import PaymentModal from "../Payment/PayherePayment";
import { AcceptJob, MakePayment } from "../../service/jobService";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RatingComponent from "./RatingAndFeedback";
export default function MoreDetails({ job, user }) {
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [isFeedback, setIsFeedback] = useState(false);

  useEffect(() => {
    setJobDetails(job);
  }, []);

  const handleAccept = async () => {
    await AcceptJob({ id: job._id, description: description })
      .then(({ data }) => {
        toast.success("Job accepted");
        setJobDetails(data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const paymentDetails = {
    orderId: GetUniqueId(job._id) + GetUniqueId(job.taskId),
    name: `JOB-${GetUniqueId(job._id + "")}`,
    amount: parseInt(job.price) + parseInt(job.price * 0.05),
    email: user.email,
    city: user.location,
    first_name: user.name + "".split(" ")[0],
    last_name: user.name + "".split(" ")[1],
  };

  const handlePayment = async () => {
    await MakePayment(job._id)
      .then(({ data }) => {
        setJobDetails(data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  if (!isFeedback) {
    return (
      jobDetails !== null && (
        <div>
          <div>
            <tr>
              <td>
                <b>Job ID</b>
              </td>
              <td>{`JOB-${GetUniqueId(jobDetails._id + "")}`}</td>
            </tr>
            <tr>
              <td>
                <b>Task ID</b>
              </td>
              <td>{`TSK-${GetUniqueId(jobDetails.taskId + "")}`}</td>
            </tr>
            <tr>
              <td>
                <b>Price</b>
              </td>
              <td>
                {parseInt(jobDetails.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "LKR",
                })}
              </td>
            </tr>
            <tr>
              <td>
                <b>Deadline</b>
              </td>
              <td>{formatDate(new Date(jobDetails.deadline), "yyyy-MM-dd")}</td>
            </tr>
            <tr>
              <td>
                <b>Accepted Date</b>
              </td>
              <td>
                {formatDate(new Date(jobDetails.acceptedAt), "yyyy-MM-dd")}
              </td>
            </tr>
            <tr>
              <td>
                <b>Delivered Date</b>
              </td>
              <td>
                {formatDate(new Date(jobDetails.deliveredDate), "yyyy-MM-dd")}
              </td>
            </tr>
            <tr>
              <td>
                <b>Job Status</b>
              </td>
              <td>{jobDetails.status[jobDetails.status.length - 1].status}</td>
            </tr>
            <tr>
              <td style={{ width: "9rem" }}>
                <b>Payment Status</b>
              </td>
              <td>{jobDetails.isPaymentDone ? "Paid" : "Not Paid"}</td>
            </tr>
          </div>
          <br />
          <div>
            <Typography variant="h6" fontWeight={"bold"}>
              Deliverables
            </Typography>
            <Paper
              sx={{
                display: "flex",

                p: 1,
                m: 0,
              }}
            >
              {jobDetails.deliverables.length !== 0 ? (
                jobDetails.deliverables.map((item, i) => {
                  let itemIcon;
                  if (item.type === "image") {
                    itemIcon = (
                      <FontAwesomeIcon
                        icon={faFileImage}
                        style={{ fontSize: "3rem" }}
                      />
                    );
                  }
                  return (
                    <a
                      key={i}
                      href={item.url}
                      style={{
                        textDecoration: "none",
                        color: colors.secondary,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          margin: "1rem",
                          cursor: "pointer",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {itemIcon}
                        <span style={{ color: colors.primary }}>
                          {item.name}
                        </span>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div>No deliverables available</div>
              )}
            </Paper>
          </div>
          <br />
          {user.userRole === "Employer" && !jobDetails.isEmployerAccepted && (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <Typography>
                  Please conform that job is complete and acceptable.
                </Typography>
              </div>
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: checked && colors.primary }}
                  disabled={!checked}
                  onClick={handleAccept}
                >
                  Accept & Complete Job
                </Button>
              </div>
            </div>
          )}
          {user.userRole === "Employer" &&
            jobDetails.isEmployerAccepted &&
            !jobDetails.isPaymentDone && (
              <div>
                <tr>
                  <td>
                    <b>Job Price</b>
                  </td>
                  <td>
                    {parseInt(jobDetails.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "9rem" }}>
                    <b>Handling fee(5%)</b>
                  </td>
                  <td>
                    {parseInt(jobDetails.price * 0.05).toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Total Amount</b>
                  </td>
                  <td>
                    {(
                      parseInt(jobDetails.price) +
                      parseInt(jobDetails.price * 0.03)
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    })}
                  </td>
                </tr>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <PaymentModal
                    paymentDetails={paymentDetails}
                    handlePayment={handlePayment}
                  />
                </div>
              </div>
            )}

          {jobDetails.feedback === null &&
            jobDetails.isPaymentDone &&
            user.userRole === "Employer" && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: checked && colors.primary }}
                  onClick={() => setIsFeedback(true)}
                >
                  Give your Feedback
                </Button>
              </div>
            )}
          {jobDetails.feedback === null &&
            jobDetails.isPaymentDone &&
            user.userRole === "Professional" && (
              <div style={{ marginBottom: "1rem" }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Feedback
                </Typography>
                <div>No Feedback provided by Employer</div>
              </div>
            )}
          {jobDetails.feedback !== null && (
            <div>
              <Typography variant="h6" fontWeight={"bold"}>
                Feedback
              </Typography>

              <div style={{ marginLeft: "0.5rem", marginTop: "1rem" }}>
                <tr>
                  <td>Job Quality</td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={jobDetails.feedback.rating.quality}
                      readOnly
                    />
                    <Typography variant="body2">
                      ({jobDetails.feedback.rating.quality})
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>Professionalism</td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={jobDetails.feedback.rating.professionalism}
                      readOnly
                    />
                    <Typography variant="body2">
                      ({jobDetails.feedback.rating.professionalism})
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>Communication</td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={jobDetails.feedback.rating.communication}
                      readOnly
                    />
                    <Typography variant="body2">
                      ({jobDetails.feedback.rating.communication})
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "9rem" }}>On Time Delivery</td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={jobDetails.feedback.rating.time}
                      readOnly
                    />
                    <Typography variant="body2">
                      ({jobDetails.feedback.rating.time})
                    </Typography>
                  </td>
                </tr>
                <br />
                <tr>
                  <td style={{ width: "10rem" }}>
                    <b>Overall Job Rating</b>
                  </td>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="read-only"
                      value={jobDetails.feedback.overall}
                      readOnly
                      precision={0.5}
                    />
                    <Typography variant="body2">
                      ({jobDetails.feedback.overall})
                    </Typography>
                  </td>
                </tr>
                <br />
                <div>
                  <Typography fontWeight={"bold"}>
                    Feedback
                  </Typography>
                  <TextField fullWidth multiline rows={3} value={jobDetails.feedback.feedback} disabled />
                </div>
                <br />
              </div>
            </div>
          )}
        </div>
      )
    );
  } else {
    return (
      <div>
        <div>
          <IconButton onClick={() => setIsFeedback(false)}>
            <ArrowBackIcon />
          </IconButton>
          Back
        </div>
        <div style={{ margin: "1rem" }}>
          <div>
            <RatingComponent
              job={job}
              setJobDetails={setJobDetails}
              setIsFeedback={setIsFeedback}
            />
          </div>
        </div>
      </div>
    );
  }
}
