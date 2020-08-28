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
};

const handleLoginFormSubmit = (e) => {
  e.preventDefault();
  const newNickName = loginInput.value;
  console.log(newNickName);
  localStorage.setItem(NICKNAME, `${newNickName}`);
  loginInput.value = "";
  login(newNickName);
};

loginForm.addEventListener("submit", handleLoginFormSubmit);

if (nickName == null) {
  console.log(nickName);
  body.className = LOGGED_OUT;
} else {
  console.log(nickName);
  body.className = LOGGED_IN;
  login(nickName);
}
