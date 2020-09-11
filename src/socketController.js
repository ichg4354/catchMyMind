import events from "./events.js";
import express from "express";
import { chooseRandomWord } from "./words.js";
import { restart } from "nodemon";

let sockets = [];
let gameStatus = false;
let leader = null;
let word = null;
let timeOutId = null;

export const handleSocketConnection = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (events, data) => io.emit(events, data);

  const sendUpdate = () => superBroadcast("update", { sockets });

  const setLeader = () => {
    const leader = sockets[Math.floor(Math.random() * sockets.length)];
    return leader;
  };

  const restartGame = async () => {
    if (sockets.length > 1) {
      console.log("startgame fnction about to start");
      superBroadcast("gameStartSoon");
      superBroadcast("gameEnd");
      setTimeout(() => superBroadcast("gameStartSoon"), 2000);
      setTimeout(() => startGame(), 4000);
    }
  };

  const setGameTime = async () => {
    timeOutId = setTimeout(() => stopGame(), 7000);
  };

  const startGame = () => {
    if (gameStatus === false) {
      gameStatus = true;
      leader = setLeader();
      word = chooseRandomWord();
      superBroadcast("gameStart");
      setTimeout(() => io.to(leader.id).emit("notifyLeader", { word }), 2000);
      setGameTime();
    }
  };

  const stopGame = () => {
    gameStatus = false;
    superBroadcast("gameEnd");
    clearTimeout(timeOutId);
    restartGame();
  };

  socket.on("setNickname", function ({ nickName }) {
    sockets.push({ id: socket.id, nickName: nickName, points: 0 });
    console.log(`${nickName} connected`);
    socket.nickName = nickName;
    broadcast("newUser", { nickName });
    sendUpdate();
    if (sockets.length > 1) {
      startGame();
    } else {
      stopGame();
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

  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id == id) {
        socket.points += 10;
      }
      return socket;
    });
  };

  socket.on("message", function ({ message }) {
    if ((word = message)) {
      addPoints(socket.id);
      sendUpdate();
      superBroadcast("pointAdded", socket.nickName);
      broadcast("newMessage", {
        nickName: "Bot",
        message: `${socket.nickName} WON👏🏼 the word was: ${word}`,
      });
      stopGame();
      // superBroadcast("gameStartSoon");
      // setTimeout(() => startGame(), 3000);
    } else {
      broadcast("newMessage", {
        nickName: socket.nickName,
        message: message,
      });
    }
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
