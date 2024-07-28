/* eslint-disable react/prop-types */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Badge, IconButton } from "@mui/material";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function ChatList({ user, onClose }) {
  const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div style={{ height: "80vh" }}>
      {selectedChat === null ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value}>
                <ListItemButton onClick={() => setSelectedChat(value)}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      id={labelId}
                      primary={`TSK-001342943931 ${value + 1}`}
                    />
                    <div>
                      <Badge
                        badgeContent={4}
                        color="error"
                        style={{ marginRight: "2rem" }}
                      />
                      <ArrowForwardIosIcon fontSize="sm" />
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <div style={{ padding: "1rem" }}>
          <div style={{ fontWeight: "bold" }}>
            <IconButton onClick={() => setSelectedChat(null)}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            Back to List
          </div>
          <div style={{ padding: "1rem" }}>
          </div>
        </div>
      )}
    </div>
  );
}
