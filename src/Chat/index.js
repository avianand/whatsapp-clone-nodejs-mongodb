import {
  AttachFile,
  KeyboardVoice,
  Mood,
  MoreVert,
  Search,
  Warning,
} from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useParams, useLocation } from "react-router-dom";
import axios from "../axios";
import db from "../firebase";
import "./index.scss";
import { useStateValue } from "../StateProvider";

function Chat() {
  const [input, setinput] = useState("");
  const [seed, setseed] = useState("");
  const [{ user, rooms, currentRoom }, dispatch] = useStateValue();

  const handleChange = (e) => {
    setinput(e.target.value);
  };
  const genMessageId = () => {
    return (
      currentRoom?.roomId +
      "_message_" +
      Math.floor(1000 + Math.random() * 9000)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      roomId: currentRoom?.roomId,
      messages: {
        id: genMessageId(),
        message: input,
        timestamp: new Date(),
        deleted: false,
        sender: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    setinput("");
  };
  const isSender = (message) => {
    if (user?.email === message?.sender.email) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat_header">
        <div className="activeUser">
          <Avatar
            src={`https://avatars.dicebear.com/api/pixel-art/:${seed}.svg`}
          />
          <div className="activeUserDetails">
            <span className="activeUserName">{currentRoom?.roomName}</span>
            <span className="activeUserStatus">Last seen at...</span>
          </div>
        </div>

        <div className="rightIcons">
          <IconButton className="chatIcon">
            <Search />
          </IconButton>
          <IconButton className="chatIcon">
            <AttachFile />
          </IconButton>
          <IconButton className="moreIcon">
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {currentRoom?.messages.length ? (
          currentRoom?.messages.map((message, index) => {
            return (
              <p
                key={message?._id}
                className={`chatMessage ${
                  isSender(message) ? "chatReceiver" : ""
                }`}
              >
                <span className="chatName">{message?.name}</span>
                {message?.message}
                <span className="chatTimeStamp">{message?.timestamp}</span>
              </p>
            );
          })
        ) : (
          <div className="noMessage">
            <Warning /> No messages to display
          </div>
        )}
      </div>
      <div className="chat_footer">
        <IconButton>
          <Mood className="moodIcon" />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            className="chatText"
            value={input}
            onChange={handleChange}
          />
          <button type="submit"></button>
        </form>
        <IconButton>
          <KeyboardVoice className="voiceIcon" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
