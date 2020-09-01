import { handleNewUser, handleUserDisconenct } from "./notifications";
import { handleNewMessage } from "./chat.js";
import {
  handleMouseMove,
  handleMouseDown,
  handleFillPaintBtnClick,
} from "./canvas.js";
export const getSocket = () => window.socket;

export const initSocket = () => {
  const socket = getSocket();
  socket.on("newUser", handleNewUser);
  socket.on("userDisconnect", handleUserDisconenct);
  socket.on("newMessage", handleNewMessage);
  socket.on("mouseMove", handleMouseMove);
  socket.on("mouseDown", handleMouseDown);
  socket.on("fillPaintBtnClick", handleFillPaintBtnClick);
};
