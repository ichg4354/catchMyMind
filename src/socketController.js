import events from "./events.js";
import express from "express";
import { chooseRandomWord } from "./words.js";

let sockets = [];
let gameStatus = false;
let leader = null;

export const handleSocketConnection = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (events, data) => io.emit(events, data);

  const sendUpdate = () => superBroadcast("update", { sockets });

  const setLeader = () => {
    const leader = sockets[Math.floor(Math.random() * sockets.length)];
    return leader;
  };

  const startGame = () => {
    if (gameStatus === false) {
      gameStatus = true;
      leader = setLeader();
      let word = chooseRandomWord();
      superBroadcast("gameStart");
      setTimeout(() => io.to(leader.id).emit("notifyLeader", { word }), 2000);
    }
  };

  const stopGame = () => {
    gameStatus = false;
    superBroadcast("gameEnd");
  };

  socket.on("setNickname", function ({ nickName }) {
    sockets.push({ id: socket.id, nickName: nickName, points: 0 });
    console.log(`${nickName} connected`);
    socket.nickName = nickName;
    broadcast("newUser", { nickName });
    sendUpdate();
    if (sockets.length > 1) {
      startGame();
      console.log("startgame");
    } else {
      stopGame();
      console.log("endgame");
    }
  });

  socket.on("disconnect", function () {
    broadcast("userDisconnect", { nickName: socket.nickName });
    console.log(`${socket.nickName} disconnected!`);
    const filteredSocket = sockets.filter(
      (each) => each.nickName !== socket.nickName
    );
    sockets = filteredSocket;
    sendUpdate();
    if (sockets.length <= 1) {
      stopGame();
    } else if (leader) {
      if (leader.id == socket.id) {
        stopGame();
      }
    }
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
