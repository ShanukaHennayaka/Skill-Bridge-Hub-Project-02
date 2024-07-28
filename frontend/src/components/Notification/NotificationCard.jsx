/* eslint-disable react/prop-types */
import { IconButton, Paper, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { formatDate } from "date-fns";
import { DeleteNotification } from "../../service/notificationService";

export default function NotificationCard({notification, fetchAll}) {

    const handleDelete = async()=>{
        await DeleteNotification(notification._id).then(({data})=>{
            console.log(data)
            fetchAll()
        }).catch((err)=>{
            console.log(err)
            fetchAll();
        })
    }

  return (
    <Paper
      style={{
        width: "100%",
        padding: "0.5rem",
        marginBottom: "0.5rem",
        borderRadius: "10px",
        backgroundColor:'lightblue'
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={"14px"} fontWeight={"bold"}>
          Notification
        </Typography>
        <IconButton onClick={handleDelete} >
          <ClearIcon fontSize="sm" />
        </IconButton>
      </div>
      <div style={{ display: "flex" }}>
        <Typography fontSize={"13px"} style={{ marginRight: "2rem" }}>
          {notification.message}
        </Typography>
        <Typography
          fontSize={"12px"}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: "0rem 0.5rem .6rem 0",
          }}
        >
          {formatDate(notification.sendAt, "HH:mm")}
        </Typography>
      </div>
    </Paper>
  );
}
