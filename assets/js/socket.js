import { handleNewUser, handleUserDisconenct } from "./notifications";
import { handleNewMessage } from "./chat.js";
export const getSocket = () => window.socket;

export const initSocket = () => {
  const socket = getSocket();
  socket.on("newUser", handleNewUser);
  socket.on("userDisconnect", handleUserDisconenct);
  socket.on("newMessage", handleNewMessage);
};
