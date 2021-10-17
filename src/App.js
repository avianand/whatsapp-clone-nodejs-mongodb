import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pusher from "pusher-js";
import SideBar from "./SideBar";
import Chat from "./Chat";
import axios from "./axios";
import Login from "./Login";
import "./App.scss";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Typography } from "@mui/material";

const App = () => {
  const [messages, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      dispatch({
        type: actionTypes.GET_ROOMS,
        rooms: response.data,
      });
      dispatch({
        type: actionTypes.SET_CURRENT_ROOM,
        currentRoomId: response.data[0].roomId,
      });
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("9aa2829cdbe26b21c341", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("updated", (newMessage) => {
      setmessages([...messages, newMessage.messages]);
      dispatch({
        type: actionTypes.ADD_NEW_MESSAGE,
        message: newMessage.message,
      });
    });
    channel.bind("inserted", (newRoom) => {
      dispatch({
        type: actionTypes.ADD_NEW_ROOM,
        room: newRoom.newRoom,
      });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="app__body">
            <Router>
              <SideBar />
              <Switch>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
