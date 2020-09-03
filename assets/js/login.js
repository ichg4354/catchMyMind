import { initSocket } from "./socket";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsForm");
const loginInput = document.getElementById("jsInput");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickName";

const nickName = localStorage.getItem(NICKNAME);

window.loggedIn = "no";

const login = (nickName) => {
  window.socket = io.connect("/");
  window.socket.emit("setNickname", { nickName: nickName });
  initSocket();
};

const handleLoginFormSubmit = (e) => {
  const newNickName = loginInput.value;
  localStorage.setItem(NICKNAME, `${newNickName}`);
  loginInput.value = "";
  login(newNickName);
  console.log("Login1");
  window.loggedIn = "yes";
};

loginForm.addEventListener("submit", handleLoginFormSubmit);

if (nickName == null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  if (loggedIn == "no") {
    login(nickName);
    console.log("Login2");
  }
}
