import { handleNewUser, handleUserDisconenct } from "./notifications";
import { handleNewMessage } from "./chat.js";
import {
  handleMouseMove,
  handleMouseDown,
  handleFillPaintBtnClick,
  handleResetBtnClickForSocket,
} from "./canvas.js";
import {
  handleGameStart,
  handleNotifyLeader,
  handleGameEnd,
} from "./player.js";
import { handleUpdate } from "./update.js";
export const getSocket = () => window.socket;

export const initSocket = () => {
  const socket = getSocket();
  socket.on("newUser", handleNewUser);
  socket.on("userDisconnect", handleUserDisconenct);
  socket.on("newMessage", handleNewMessage);
  socket.on("mouseMove", handleMouseMove);
  socket.on("mouseDown", handleMouseDown);
  socket.on("fillPaintBtnClick", handleFillPaintBtnClick);
  socket.on("resetBtnClick", handleResetBtnClickForSocket);
  socket.on("update", handleUpdate);
  socket.on("notifyLeader", handleNotifyLeader);
  socket.on("gameStart", handleGameStart);
  socket.on("gameEnd", handleGameEnd);
};
