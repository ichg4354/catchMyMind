import { blockCanvasUse, enableCanvasUse } from "./canvas";
import { reset } from "./canvas.js";
import { disableChat, enableChat } from "./chat.js";

const notification = document.getElementById("jsNotification");


export const handleGameStart = () => {
  console.log("handlegamestart");
  resetNotification();
  fillNotification("Game has started");
  reset();
  blockCanvasUse();
  enableChat();
};

export const handleNotifyLeader = ({ word }) => {
  window.word = word;
  resetNotification();
  fillNotification(`You are the leader! Your word --> ${word}`);
  enableCanvasUse();
  disableChat();
};

const fillNotification = (word) => {
  resetNotification();
  notification.innerText = word;
};

export const handleGameEnd = () => {
  resetNotification();
  fillNotification("Game has ended");
  reset();
  blockCanvasUse();
};

const resetNotification = () => (notification.innerText = "");
