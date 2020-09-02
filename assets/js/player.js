import { blockCanvasUse, enableCanvasUse } from "./canvas";

export const handleGameStart = () => {
  console.log("game has started");
  blockCanvasUse();
  alert("game has started");
};

export const handleNotifyLeader = ({ word }) => {
  console.log(`you are the leader your word:${word}`);
  enableCanvasUse();
  alert(`you are the leader your word is ${word}`);
};
