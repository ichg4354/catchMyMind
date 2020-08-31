import events from "./events.js";
import e from "express";
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
  socket.on("mouseMoved", function ({ x, y }) {
    broadcast("mouseMove", { x: x, y: y });

  });
  socket.on("mouseDowned", function ({ x, y }) {
    broadcast("mouseDown", { x: x, y: y });
  });
};
