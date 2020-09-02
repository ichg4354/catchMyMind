import events from "./events.js";
import express from "express";
import { chooseRandomWord } from "./words.js";

let sockets = [];

export const handleSocketConnection = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (events, data) => io.emit(events, data);

  const sendUpdate = () => superBroadcast("update", { sockets });

  const setLeader = () => {
    const Leader = sockets[Math.floor(Math.random() * sockets.length)];
    console.log(Leader.nickName);
  };

  socket.on("setNickname", function ({ nickName }) {
    sockets.push({ id: socket.id, nickName: nickName, points: 0 });
    console.log(`${nickName} connected`);
    socket.nickName = nickName;
    broadcast("newUser", { nickName });
    sendUpdate();
  });

  socket.on("disconnect", function () {
    broadcast("userDisconnect", { nickName: socket.nickName });
    console.log(`${socket.nickName} disconnected!`);
    const filteredSocket = sockets.filter(
      (each) => each.nickName !== socket.nickName
    );
    sockets = filteredSocket;
    sendUpdate();
  });

  socket.on("message", function ({ message }) {
    console.log(message);
    broadcast("newMessage", {
      nickName: socket.nickName,
      message: message,
    });
  });

  socket.on("mouseMoved", function ({ x, y, color, brushSize }) {
    broadcast("mouseMove", { x, y, color, brushSize });
  });

  socket.on("mouseDowned", function ({ x, y, color }) {
    broadcast("mouseDown", { x, y, color });
  });

  socket.on("fillPaintBtnClicked", function ({ color }) {
    broadcast("fillPaintBtnClick", { color });
  });

  socket.on("resetBtnClicked", function () {
    broadcast("resetBtnClick");
  });
};
