import { getSocket } from "./socket";

const jsChatContainer = document.getElementById("jsChatContainer");
const jsSendTextForm = document.getElementById("jsSendTextForm");
const jsSendText = document.getElementById("jsSendText");
const jsTextUl = document.getElementById("jsChatUl");

export const handleNewMessage = ({ nickName, message }) => {
  createMessage(nickName, message, "received");
};

const createMessage = (nickName, msg, className) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class='${className}'>${nickName}:&nbsp</span>${msg}`;
  jsTextUl.appendChild(li);
};

const handleSendTextFormSubmit = (e) => {
  e.preventDefault();
  const { value } = jsSendText;
  getSocket().emit("message", { message: value });
  console.log(value);
  createMessage("You", value, "sended");
  jsSendText.value = "";
};

export const disableChat = () => (jsChatContainer.style.display = "none");
export const enableChat = () => (jsChatContainer.style.display = "block");

jsSendTextForm.addEventListener("submit", handleSendTextFormSubmit);
