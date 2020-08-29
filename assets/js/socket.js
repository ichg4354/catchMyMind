import { handleNewUser, handleUserDisconenct } from "./notifications";

export const getSocket = () => window.socket;

export const initSocket = () => {
  const socket = getSocket();
  socket.on("newUser", handleNewUser);
  socket.on("userDisconnect", handleUserDisconenct);
};
