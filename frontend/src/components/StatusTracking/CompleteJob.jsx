import {
  Backdrop,
  Badge,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import colors from "../../assets/colors";
import { DeliverJob } from "../../service/jobService";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function CompleteJob({ job, onClose }) {
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleAttachmentUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        const result = reader.result;
        setAttachments([
          ...attachments,
          { name: file.name, url: result, file, type: file.type.split("/")[0] },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setOpen(true);
    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("description", description);

    attachments.forEach((attachment) => {
      formData.append(`attachments`, attachment.file);
    });

    await DeliverJob(formData)
      .then(({ data }) => {
        onClose();
        setOpen(false);
        toast.success(data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data);
        }
        onClose();
        setOpen(false);
        console.log(error);
      });
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        multiline
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div style={{ marginTop: "2rem" }}>
        <Typography
          style={{ marginRight: "1rem", marginBottom: "1rem" }}
          fontWeight={"bold"}
          fontSize="22px"
        >
          Attach Deliverables
        </Typography>
        <Paper
          sx={{
            display: "flex",
            overflowX: "auto",
            p: 1,
            m: 0,
          }}
        >
          <div
            style={{
              backgroundColor: "#E9EAEC",
              width: "10vh",
              height: "10vh",
              textAlign: "center",
              border: "1px solid #C7C9CE",
              cursor: "pointer",
              marginRight: "2rem",
              display: attachments.length >= 5 ? "none" : "inline",
            }}
          >
            <label
              htmlFor="AttachmentInput"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                cursor: "pointer",
              }}
            >
              <FileUploadIcon size={25} />
              Upload
            </label>
            <input
              type="file"
              accept="image/*, application/pdf"
              style={{ display: "none" }}
              onChange={handleAttachmentUpload}
              id="AttachmentInput"
            />
          </div>
          {attachments.map((item, i) => {
            let itemIcon;
            if (item.type === "image") {
              itemIcon = (
                <FontAwesomeIcon
                  icon={faFileImage}
                  style={{ fontSize: "3rem", color: colors.secondary }}
                />
              );
            } else {
              itemIcon = (
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ fontSize: "3rem", color: colors.secondary }}
                />
              );
            }
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: "2rem",
                }}
              >
                <Badge
                  badgeContent={
                    <div
                      onClick={() => {
                        setAttachments(
                          attachments.filter((a) => a.file !== item.file)
                        );
                      }}
                    >
                      <DeleteIcon
                        style={{ color: "black", cursor: "pointer" }}
                      />
                    </div>
                  }
                >
                  {itemIcon}
                </Badge>

                <span style={{ color: colors.primary }}>
                  {item.name.substring(0, 12)}...
                </span>
              </div>
            );
          })}
        </Paper>
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
          style={{ marginRight: "1rem", backgroundColor: colors.secondary }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: colors.primary }}
          onClick={handleSubmit}
        >
          Complete Job
        </Button>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
