import { initSocket } from "./socket";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsForm");
const loginInput = document.getElementById("jsInput");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickName";

const nickName = localStorage.getItem(NICKNAME);

const login = (nickName) => {
  window.socket = io.connect("/");
  window.socket.emit("setNickname", { nickName: nickName });
  initSocket();
};

const handleLoginFormSubmit = (e) => {
  e.preventDefault();
  const newNickName = loginInput.value;
  localStorage.setItem(NICKNAME, `${newNickName}`);
  loginInput.value = "";
  login(newNickName);
  body.className = LOGGED_IN;
  console.log("Login1");
};

loginForm.addEventListener("submit", handleLoginFormSubmit);

if (nickName == null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickName);
  console.log("Login2");
}
