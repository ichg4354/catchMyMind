const socket = io.connect("/");

function sendMessage(message) {
  socket.emit("newMessage", { message: message });
}

function setnickName(nickname) {
  socket.emit("setNickName", { nickname });
}

socket.on("messageNotification", ({ message,nickname }) =>
  console.log(`${nickname}:  ${message}`)
);

