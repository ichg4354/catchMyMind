import events from "./events.js";
export const handleSocketConnection = (socket) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  socket.on("setNickname", function ({ nickName }) {
    socket.nickName = nickName;
    broadcast("newUser", { nickName: nickName });
  });
  socket.on("disconnect", function () {
    broadcast("userDisconnect", { nickName: socket.nickName });
  });
  socket.on("message", function ({ message }) {
    console.log(message);
    broadcast("newMessage", {
      nickName: socket.nickName,
      message: message,
    });
  });
};
