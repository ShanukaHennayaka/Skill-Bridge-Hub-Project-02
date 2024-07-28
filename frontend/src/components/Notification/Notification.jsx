/* eslint-disable react/prop-types */
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import NotificationCard from "./NotificationCard";
import { GetAllNotifications } from "../../service/notificationService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Notification({ user, setNotificationCount }) {
  const [notifications, setNotifications] = useState([]);

  const fetchAllNotifications = async () => {
    await GetAllNotifications(user._id)
      .then(({ data }) => {
        setNotifications(data);
        setNotificationCount(data.length);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    fetchAllNotifications();
  }, []);

  return (
    <div>
      <Box sx={{ width: 350, padding: "1rem" }} role="presentation">
        <div>
          <Typography variant="h5" fontWeight={"bold"}>
            Notifications
          </Typography>
          <Divider component={"h4"} sx={{ marginY: "1rem" }} />
        </div>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} disablePadding>
              <NotificationCard
                notification={notification}
                fetchAll={fetchAllNotifications}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}
