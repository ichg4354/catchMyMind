import events from "./events.js";
export const handleSocketConnection = (socket) => {
  socket.on("setNickname", function ({ nickName }) {
    socket.nickName = nickName;
    socket.broadcast.emit("newUser", { nickName: nickName });
  });
  socket.on("disconnect", function () {
    socket.broadcast.emit("userDisconnect", { nickName: socket.nickName });
  });
};
