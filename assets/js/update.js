const board = document.getElementById("jsBoard");

export const handleUpdate = ({ sockets }) => {
  resetBoard();
  let beforeNickName = null;
  //cludge
  sockets.forEach((socket) => {
    if (socket.nickName != beforeNickName) {
      let boardElement = document.createElement("div");
      boardElement.innerText = `${socket.nickName}:${socket.points}`;
      board.appendChild(boardElement);
      beforeNickName = socket.nickName;
    } else {
      console.log("FUCK YEA");
    }
  });
};

const resetBoard = () => (board.innerHTML = "");
