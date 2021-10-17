export const initialState = {
  user: null,
  rooms: [],
  currentRoom: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  GET_ROOMS: "GET_ROOMS",
  ADD_NEW_MESSAGE: "ADD_NEW_MESSAGE",
  SET_CURRENT_ROOM: "SET_CURRENT_ROOM",
  ADD_NEW_ROOM: "ADD_NEW_ROOM",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.GET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      };
    case actionTypes.ADD_NEW_MESSAGE:
      let currRoom = state.currentRoom;
      let messagesArray = currRoom.messages;
      let newMessageArray = [...messagesArray, action.message];
      currRoom.messages = newMessageArray;
      return {
        ...state,
        currentRoom: currRoom,
      };
    case actionTypes.SET_CURRENT_ROOM:
      const currentRoomDetails = state.rooms?.find(
        (room) => room.roomId === action.currentRoomId
      );
      return {
        ...state,
        currentRoom: currentRoomDetails,
      };
    case actionTypes.ADD_NEW_ROOM:
      const rooms = state.rooms;
      const newRooms = [...rooms, action.room];
      return {
        ...state,
        rooms: newRooms,
      };
    default:
      return state;
  }
};

export default reducer;
