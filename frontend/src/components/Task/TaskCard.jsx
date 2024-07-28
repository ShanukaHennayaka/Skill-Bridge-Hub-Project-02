/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  IconButton,
  DialogActions,
} from "@mui/material";
import colors from "../../assets/colors";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ModifyTaskForm from "./ModifyTaskForm";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteTask } from "../../service/taskService";

export default function TaskCard({
  task,
  isEditable = false,
  reloadTasks,
  isOwner = false,
  isAdmin = false,
}) {
  const [openModify, setOpenModify] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseModify = () => {
    setOpenModify(false);
    reloadTasks();
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    reloadTasks();
  };

  const handleDelete = async () => {
    await DeleteTask(task._id)
      .then(({ data }) => {
        toast.success(data);
        handleCloseDelete();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
          handleCloseDelete();
        }
        console.log(err);
      });
  };
  return (
    <Card sx={{ maxWidth: 250, minWidth: 280 }}>
      <CardMedia
        component="img"
        height="194"
        image={task.coverImage}
        alt="Paella dish"
      />
      <CardContent>
        <Chip
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              src="/static/images/avatar/1.jpg"
            />
          }
          style={{ marginBottom: "0.6rem" }}
          label={<span style={{ fontSize: "14px" }}>{task.user.name}</span>}
          variant="outlined"
        />
        <Typography variant="body2" color="text.secondary">
          {task.shortDescription}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ display: "flex", alignItems: "center" }}
        ></Typography>
        <div style={{ display: "flex", marginTop: ".5rem" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontWeight: "bold", marginRight: "1rem" }}
          >
            Budget
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.budget.toLocaleString("en-US", {
              style: "currency",
              currency: "LKR",
            })}
          </Typography>
        </div>
        <div style={{ display: "flex", marginTop: ".5rem" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontWeight: "bold", marginRight: "1rem" }}
          >
            Bidding Status
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.isBidding ? (
              <Chip
                label="Open"
                color="success"
                variant="outlined"
                size="small"
              />
            ) : (
              <Chip
                label="Closed"
                color="error"
                variant="outlined"
                size="small"
              />
            )}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: colors.secondary,
          }}
          onClick={() => {
            if (isOwner) {
              window.location = `/task-owner/${task._id}`;
            } else {
              window.location = `/task/${task._id}`;
            }
          }}
        >
          More Details
        </Button>
        {isEditable && (
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: colors.primary }}
            startIcon={<BorderColorIcon />}
            onClick={() => {
              if (task.isBidding) {
                toast.custom(
                  <Alert severity="warning">
                    You can&apos;t modify while bidding is open.
                  </Alert>
                );
              } else {
                setOpenModify(true);
              }
            }}
          >
            Modify
          </Button>
        )}
        {isAdmin && (
          <IconButton onClick={() => setOpenDelete(true)}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
      <Dialog
        fullWidth={true}
        open={openModify}
        onClose={handleCloseModify}
        maxWidth={"md"}
      >
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between" }}
          fontWeight={"bold"}
        >
          Modify Task
        </DialogTitle>
        <DialogContent>
          <ModifyTaskForm onClose={handleCloseModify} task={task} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDelete}
        fullWidth={true}
        onClose={handleCloseDelete}
        maxWidth={"sm"}
      >
        <DialogTitle>Remove Task</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
