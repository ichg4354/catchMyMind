import { blockCanvasUse, enableCanvasUse } from "./canvas";
import { reset } from "./canvas.js";

const notification = document.getElementById("jsNotification");

export const handleGameStart = () => {
  fillNotification("Game has started");
  reset();
  blockCanvasUse();
};

export const handleNotifyLeader = ({ word }) => {
  fillNotification(`You are the leader! Your word:${word}`);
  enableCanvasUse();
};

const fillNotification = (word) => {
  resetNotification();
  notification.innerText = word;
};
const resetNotification = () => (notification.innerText = "");
