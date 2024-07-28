/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import colors from "../../assets/colors";
import { GiveFeedback } from "../../service/jobService";
import toast from "react-hot-toast";

export default function RatingComponent({ job, setJobDetails, setIsFeedback }) {
  const [ratings, setRatings] = useState({
    quality: 0,
    professionalism: 0,
    communication: 0,
    time: 0,
  });
  const [feedback, setFeedback] = useState("");

  const handleRating = (aspect, rating) => {
    setRatings({ ...ratings, [aspect]: rating });
  };

  const ratingTexts = ["Useless", "Poor", "Ok", "Good", "Excellent"];

  const renderStars = (aspect) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                textAlign: "center",
                margin: "0 5px",
              }}
            >
              <div
                onClick={() => handleRating(aspect, index + 1)}
                style={{
                  cursor: "pointer",
                  color: ratings[aspect] > index ? "gold" : "gray",
                  fontSize: "24px",
                }}
              >
                ★
              </div>
              <div style={{ fontSize: "12px" }}>{ratingTexts[index]}</div>
            </div>
          ))}
      </div>
    );
  };

  const handleSubmit = async () => {
    const deadlineDate = new Date(job.deadline);
    const submission = new Date(job.deliveredDate);
    const timeDiff = deadlineDate - submission;
    const daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let timeRating = 0;
    if (daysLate >= 0) timeRating = 5;
    else if (daysLate === -1) timeRating = 4;
    else if (daysLate === -2) timeRating = 3;
    else if (daysLate === -3) timeRating = 2;
    else if (daysLate === -4) timeRating = 1;
    else timeRating = 0;

    const updatedRatings = { ...ratings, time: timeRating };
    setRatings(updatedRatings);

    const totalRating = Object.values(updatedRatings).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const overallRating = totalRating / 4;

    const ratingAndFeedback = {
      id: job._id,
      professionalId: job.professionalId,
      rating: updatedRatings,
      feedback: feedback,
      overall: overallRating,
    };

    await GiveFeedback(ratingAndFeedback)
      .then(({ data }) => {
        toast.success("Feedback sent successfully");
        setJobDetails(data);
        setIsFeedback(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h6>1. How is the quality of the job delivered by professional?</h6>
        {renderStars("quality")}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h6>2. How is the professionalism of the professional?</h6>
        {renderStars("professionalism")}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h6>3. How is the communication of the professional?</h6>
        {renderStars("communication")}
      </div>
      <br />
      <div>
        <h6>4. Give your feedback about the job</h6>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
        }}
      >
        <Button
          variant="contained"
          style={{ backgroundColor: colors.primary }}
          onClick={handleSubmit}
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
}
