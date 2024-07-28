/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Backdrop, Badge, Button, Paper, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/colors";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { AddNewBid } from "../../service/bidService";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddNewBidForm({ task, onClose, user }) {
  const [attachments, setAttachments] = useState([]);
  const [offer, setOffer] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleAttachmentUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        const result = reader.result;
        setAttachments([
          ...attachments,
          {
            name: file.name,
            url: result,
            file,
            type: file.type.split("/")[0],
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBidSubmit = async () => {
    setOpen(true);
    const formData = new FormData();

    formData.append("bidderId", user._id);
    formData.append("ownerId", task.user._id);
    formData.append("taskId", task._id);
    formData.append("offer", offer);
    formData.append("note", note);

    attachments.forEach((attachment) => {
      formData.append(`attachments`, attachment.file);
    });

    await AddNewBid(formData).then(({data})=>{
        toast.success(data);
        onClose();
        setOpen(false);
    }).catch((err)=>{
        if(err.response){
            toast.error(err.response.data)
        }
        console.log(err)
        onClose();
        setOpen(false);
    })
  };

  return (
    <div>
      <div>
        <TextField
          fullWidth
          margin="normal"
          label="Give your Offer (LKR)"
          type="number"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Note"
          type="text"
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Typography
          style={{ marginRight: "1rem", marginBottom: "1rem" }}
          fontWeight={"bold"}
          fontSize="22px"
        >
          Attachments
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
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          type="reset"
          style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: colors.primary }}
          onClick={handleBidSubmit}
        >
          BId
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
