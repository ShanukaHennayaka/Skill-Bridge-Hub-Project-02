import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { formatISO9075 } from "date-fns";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { UpdateJobStatus } from "../../service/jobService";
import colors from "../../assets/colors";
import CompleteJob from "./CompleteJob";
import toast from "react-hot-toast";

export default function JobStatus({ job, fetchAllJob, user, onClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [statuses, setStatuses] = React.useState(null);
  const [openComplete, setOpenComplete] = React.useState(false);
  const [jobStatus, setJobStatus] = React.useState({
    status: "",
    description: "",
  });

  React.useEffect(() => {
    setStatuses(job.status);
    setActiveStep(job.status.length);
  }, []);

  const handleCloseComplete = () => {
    setOpenComplete(false);
    onClose();
  };

  const handleSubmit = async () => {
    const status = {
      id: job._id,
      newStatus: { ...jobStatus, date: new Date() },
    };
    await UpdateJobStatus(status)
      .then(({ data }) => {
        setStatuses(data.status);
        setActiveStep([...data.status].length);

        setJobStatus({
          status: "",
          description: "",
        });
        fetchAllJob();
        toast.success("Updated Delivery Status");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <>
      <div
        style={{
          marginLeft: "0rem",
          maxHeight:
            user.userRole === "Professional" && job.isJobDelivered
              ? "80vh"
              : user.userRole === "Professional" && !job.isJobDelivered
              ? "42vh"
              : "80vh",
          overflowY: "auto",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {statuses !== null &&
            [...statuses].reverse().map((step, index) => (
              <Step
                sx={{ display: "flex", flexDirection: "column" }}
                key={step.status}
              >
                <StepLabel
                  optional={
                    <Typography variant="caption">
                      {formatISO9075(step.date)}
                    </Typography>
                  }
                >
                  {step.status}
                </StepLabel>
                <Typography variant="body2" component={"i"} sx={{ ml: 4 }}>
                  {step.description}
                </Typography>
              </Step>
            ))}
        </Stepper>
      </div>
      {user.userRole === "Professional" && job.isJobDelivered === false && (
        <div style={{ marginTop: "2rem" }}>
          <Typography variant="h6">Update Job Status</Typography>
          <TextField
            fullWidth
            label="Add Current Status"
            margin="normal"
            size="small"
            value={jobStatus.status}
            onChange={(e) =>
              setJobStatus({ ...jobStatus, status: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={2}
            value={jobStatus.description}
            onChange={(e) =>
              setJobStatus({
                ...jobStatus,
                description: e.target.value,
              })
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: colors.primary }}
              onClick={() => setOpenComplete(true)}
            >
              Mark as complete
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add new status
            </Button>
          </div>
        </div>
      )}
      <Dialog open={openComplete} fullWidth onClose={handleCloseComplete}>
        <DialogTitle fontWeight={"bold"}>Job Completion</DialogTitle>
        <DialogContent>
          <CompleteJob onClose={handleCloseComplete} job={job} />
        </DialogContent>
      </Dialog>
    </>
  );
}
