import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import ChatBox from "../ChatBox";
import db from "../firebase";
import "./index.scss";
import { useStateValue } from "../StateProvider";
import axios from "../axios";

function SideBar() {
  // const [rooms, setRooms] = useState([]);
  const [{ user, rooms }, dispatch] = useStateValue();
  const [selectedRoom, setselectedRoom] = useState(null);

  useEffect(async () => {
    // const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
    //   setRooms(
    //     snapshot.docs.map((doc) => {
    //       return {
    //         id: doc.id,
    //         data: doc.data(),
    //       };
    //     })
    //   );
    // });
    // return () => {
    //   unsub();
    // };
    // const getMessages = await axios.get("/message/sync", {
    //   params: { roomId: "" },
    // });
  }, []);
  const selectRoom = (room) => {
    // setselectedRoom(room.id);
    // console.log(selectedRoom);
  };
  return (
    <div className="sidebar">
      <div className="header">
        <Avatar src={user?.photoURL} />
        {/* <Typography>{user?.displayName.split(" ")[0]}</Typography> */}
        <div className="rightIcons">
          <IconButton className="chatIcon">
            <DonutLarge />
          </IconButton>
          <IconButton className="chatIcon">
            <Chat />
          </IconButton>
          <IconButton className="moreIcon">
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="searchBarContainer">
        <div className="searchBar">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sideBarchats">
        <ChatBox addNewChat />
        {rooms
          ? rooms.map((room) => (
              <ChatBox
                key={room.roomId}
                roomId={room.roomId}
                name={room.roomName}
                users={room.users}
                messages={room.messages ? room.messages : null}
                onClick={(room) => selectRoom(room)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default SideBar;
