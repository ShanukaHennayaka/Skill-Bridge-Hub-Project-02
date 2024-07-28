/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Chat.css";
import { IconButton, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import { AddNewMessage, GetChatById } from "../../service/chatService";
import toast from "react-hot-toast";

export default function Chat({ chat, user }) {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const fetchChat = async () => {
    await GetChatById(chat._id)
      .then(({ data }) => {
        setChats(data.chat);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    fetchChat();
  });

  const handleMessageSend = async () => {
    setMessage("");
    const newMessage = {
      message: message,
      role: user.userRole,
      sendAt: new Date(),
      name: user.name,
    };
    await AddNewMessage({ id: chat._id, chats: [newMessage] })
      .then(({ data }) => {
        setChats(data.chat);
        setChats(data.chat);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        }
        console.log(err);
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-body">
        {chats.map((chat, index) => {
          return (
            <div
              key={index}
              className="message-container"
              style={
                user.userRole === "Employer"
                  ? {
                      justifyContent:
                        chat.role === "Employer" ? "flex-end" : "flex-start",
                    }
                  : {
                      justifyContent:
                        chat.role === "Employer" ? "flex-start" : "flex-end",
                    }
              }
            >
              <div
                className="chat-message"
                style={
                  user.userRole === "Employer"
                    ? {
                        backgroundColor:
                          chat.role === "Employer" ? "lightgreen" : "lightblue",
                        marginLeft: chat.role === "Employer" && "2rem",
                        marginRight: chat.role === "Professional" && "2rem",
                      }
                    : {
                        backgroundColor:
                          chat.role === "Employer" ? "lightblue" : "lightgreen",
                        marginRight: chat.role === "Employer" && "2rem",
                        marginLeft: chat.role === "Professional" && "2rem",
                      }
                }
              >
                <Typography marginRight={"3rem"} textAlign={"justify"}>
                  {chat.message}
                </Typography>
                <Typography variant="body2" className="timestamp">
                  {format(chat.sendAt, "HH:mm")}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-send">
        <TextField
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton onClick={handleMessageSend}>
          <SendIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
