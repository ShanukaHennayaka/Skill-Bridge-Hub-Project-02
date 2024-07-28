/* eslint-disable react/prop-types */
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import colors from "../../assets/colors";
import TaskCard from "../Task/TaskCard";
import { useEffect, useState } from "react";
import AddNewTaskForm from "../Task/AddNewTaskForm";
import { GetAllTaskByUser } from "../../service/taskService";

export default function TaskPosts({ user, getNumOfPosts }) {
  const [posts, setPosts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    fetchAllTasks();
  };

  const fetchAllTasks = async () => {
    await GetAllTaskByUser(user._id)
      .then(({ data }) => {
        setPosts(data);
        getNumOfPosts([...data].length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          style={{ backgroundColor: colors.primary }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setOpenAdd(true);
          }}
        >
          Add New Task
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "2rem",
          marginTop: "1rem",
        }}
      >
        {posts.reverse().map((post, index) => (
          <TaskCard
            key={index}
            task={post}
            isEditable={true}
            reloadTasks={fetchAllTasks}
            isOwner={true}
          />
        ))}
      </div>
      <Dialog
        fullWidth={true}
        open={openAdd}
        onClose={handleCloseAdd}
        maxWidth={"md"}
      >
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between" }}
          fontWeight={"bold"}
        >
          Add New Task
        </DialogTitle>
        <DialogContent>
          <AddNewTaskForm onClose={handleCloseAdd} user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
