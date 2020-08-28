import events from "./events.js";
export const handleSocketConnection = (socket) => {
  socket.on(events.nickName, function ({ nickName }) {
    socket.nickName = nickName;
    console.log(nickName);
  });
};
