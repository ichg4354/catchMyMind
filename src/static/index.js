const socket = io.connect("/");

function sendMessage(message) {
  socket.emit("newMessage", { message: message });
  console.log(`YOU:${message}`)
}

function setNickname(nickname) {
  socket.emit("newNickName", { nickname: nickname });
}

socket.on("sendMessage", ({ message, nickname }) =>
  console.log(`${nickname}: ${message}`)
);
socket.on("messageSent", ({ message, me }) => console.log(`${me}: ${message}`));
