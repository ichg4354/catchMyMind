export const handleSocketConnection = (socket) => {
  socket.on("setNickname", function ({ nickName }) {
    socket.nickName = nickName;
    console.log(nickName);
  });
};
