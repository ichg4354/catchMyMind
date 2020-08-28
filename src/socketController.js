import events from "./events.js";
export const handleSocketConnection = (socket) => {
  socket.on("setNickname", function ({ nickName }) {
    socket.nickName = nickName;
    socket.broadcast.emit("newUser", { nickName: nickName });
  });
};
