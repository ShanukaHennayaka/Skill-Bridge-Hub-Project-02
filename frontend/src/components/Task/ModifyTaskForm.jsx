/* eslint-disable react/prop-types */
import {
  Backdrop,
  Badge,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DeleteIcon from "@mui/icons-material/Delete";
import colors from "../../assets/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { DeleteTask, UpdateTask } from "../../service/taskService";
import toast from "react-hot-toast";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import { cities } from "../../assets/countries";

const ps = ["IT specialists", "Education Services", "Event Planning Services"];
const ds = [
  "Home Services",
  "Child Care Services",
  "Pet Care Services",
  "Transportation Services",
];
const hls = ["Food and Beverage Services", "Health and Fitness Services"];

export default function ModifyTaskForm({ onClose, task }) {
  const [taskData, setTaskData] = useState({
    coverImage: null,
    mainCategory: "",
    subCategory: "",
    shortDescription: "",
    budget: 0,
    location,
    deadline: format(new Date(), "yyyy-MM-dd"),
    description: "",
  });
  const [imgUrl, setImgUrl] = useState(null);

  const [reqSkill, setReqSkill] = useState("");
  const [reqSkillList, setReqSkillList] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTaskData(task);
    setImgUrl(task.coverImage);
    setReqSkillList(task.requiredSkills);
    const formattedAttachments = [];
    [...task.attachments].forEach((t) => {
      let task = t;
      task.file = t.url;
      formattedAttachments.push(task);
    });
    setAttachments(formattedAttachments);
  }, []);

  const handleAddSkill = () => {
    setReqSkillList([...reqSkillList, reqSkill]);
    setReqSkill("");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleCoverPhotoUpload = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        const result = reader.result;
        setImgUrl(result);
        setTaskData({ ...taskData, coverImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const formData = new FormData();

    if (!(taskData.coverImage + "").startsWith("https://")) {
      formData.append("coverImage", taskData.coverImage);
    }
    formData.append("shortDescription", taskData.shortDescription);
    formData.append("mainCategory", taskData.mainCategory);
    formData.append("subCategory", taskData.subCategory);
    formData.append("location", taskData.location);
    formData.append("budget", taskData.budget);
    formData.append("deadline", taskData.deadline);
    formData.append("description", taskData.description);
    formData.append("requiredSkills", JSON.stringify(reqSkillList));

    const oldAttachments = [];
    attachments.forEach((attachment) => {
      if ((attachment.url + "").startsWith("https://")) {
        delete attachment.file;
        oldAttachments.push(attachment);
      } else {
        formData.append(`newAttachments`, attachment.file);
      }
    });
    formData.append("oldAttachments", JSON.stringify(oldAttachments));
    console.log(formData);
    await UpdateTask(task._id, formData)
      .then(({ data }) => {
        toast.success(data);
        onClose();
        setOpen(false);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        setOpen(false);
        onClose();
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await DeleteTask(task._id)
      .then(({ data }) => {
        toast.success(data);
        onClose();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        onClose();
        console.log(err);
      });
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  return (
    <div style={{ padding: "2rem", paddingBottom: "1rem" }}>
      <div
        style={{
          backgroundColor: "#E9EAEC",
          width: "35vh",
          height: "25vh",
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: "25vh",
          border: "1px solid #C7C9CE",
          cursor: "pointer",
          marginRight: "2rem",
          marginBottom: imgUrl === null ? "2rem" : "4rem",
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleCoverPhotoUpload}
          id="FrontPhotoInput"
        />
        {imgUrl ? (
          <>
            <img
              src={imgUrl}
              alt="Uploaded"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "25vh",
                maxHeight: "25vh",
                border: "1px solid ",
              }}
            ></img>
            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              fullWidth
              style={{ backgroundColor: colors.secondary, marginTop: "-60%" }}
              onClick={() => {
                setImgUrl(null);
              }}
            >
              Remove
            </Button>
          </>
        ) : (
          <label
            htmlFor="FrontPhotoInput"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              cursor: "pointer",
            }}
          >
            <CameraEnhanceIcon size={20} />
            <span style={{ marginLeft: "10px" }}>Add a Cover Image</span>
          </label>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Short Description"
          type="text"
          name="shortDescription"
          value={taskData.shortDescription}
          onChange={handleFormChange}
        />
        <div style={{ display: "flex" }}>
          <FormControl fullWidth margin="normal" sx={{ marginRight: "2rem" }}>
            <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskData.mainCategory}
              label="Main Category"
              name="mainCategory"
              onChange={handleFormChange}
            >
              <MenuItem value="Professional Services">
                Professional Services
              </MenuItem>
              <MenuItem value="Domestic Services">Domestic Services</MenuItem>
              <MenuItem value="Hospitality and Lifestyle Services">
                Hospitality and Lifestyle Services
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            disabled={taskData.mainCategory === ""}
          >
            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskData.subCategory}
              label="Sub Category"
              name="subCategory"
              onChange={handleFormChange}
            >
              {taskData.mainCategory !== "" &&
              taskData.mainCategory === "Professional Services"
                ? ps.map((sc, index) => (
                    <MenuItem key={index} value={sc}>
                      {sc}
                    </MenuItem>
                  ))
                : taskData.mainCategory === "Domestic Services"
                ? ds.map((sc, index) => (
                    <MenuItem key={index} value={sc}>
                      {sc}
                    </MenuItem>
                  ))
                : taskData.mainCategory ===
                    "Hospitality and Lifestyle Services" &&
                  hls.map((sc, index) => (
                    <MenuItem key={index} value={sc}>
                      {sc}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: "flex" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Budget(LKR)"
            type="number"
            name="budget"
            value={taskData.budget}
            sx={{ marginRight: "2rem" }}
            onChange={handleFormChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="countries">Location</InputLabel>
            <Select
              labelId="countries"
              label="Location"
              name="location"
              value={taskData.location}
              onChange={handleFormChange}
            >
              {cities.map((country, i) => (
                <MenuItem key={i} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Deadline Date"
              minDate={dayjs(getTodayDate())}
              onChange={(value) => {
                setTaskData({ ...taskData, deadline: value });
              }}
              value={dayjs(taskData.deadline)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          type="text"
          multiline
          rows={4}
          name="description"
          value={taskData.description}
          onChange={handleFormChange}
        />

        <div style={{ marginTop: "1rem" }}>
          <Typography variant="h6" fontWeight={"bold"}>
            Required Skills
          </Typography>
          <ul style={{ marginTop: "1rem" }}>
            {reqSkillList.map((skill, index) => (
              <li
                key={index}
                style={{
                  margin: "1rem",
                  marginLeft: "-1rem",
                  fontSize: "18px",
                }}
              >
                {skill}
                <span
                  style={{ marginLeft: "1rem", cursor: "pointer" }}
                  onClick={() => {
                    setReqSkillList(reqSkillList.filter((s) => s !== skill));
                  }}
                >
                  <RemoveCircleIcon fontSize="small" color="error" />
                </span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Required Skill"
              type="text"
              name="skill"
              value={reqSkill}
              onChange={(e) => {
                setReqSkill(e.target.value);
              }}
              size="small"
            />
            <IconButton
              style={{ marginLeft: "1rem" }}
              disabled={reqSkill === ""}
              onClick={handleAddSkill}
            >
              <AddCircleOutlineIcon
                sx={{ color: colors.primary }}
                fontSize="large"
              />
            </IconButton>
          </div>
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
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            type="reset"
            style={{ backgroundColor: colors.secondary, marginRight: "1rem" }}
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete Task
          </Button>
          <div>
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
              type="submit"
              style={{ backgroundColor: colors.primary }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
