const board = document.getElementById("jsBoard");

export const handleUpdate = ({ sockets }) => {
  resetBoard();
  let beforeNickName = null;
  //kluge for double login when loggin through nickName fisrt set
  sockets.forEach((socket) => {
    if (socket.nickName != beforeNickName) {
      let boardElement = document.createElement("div");
      boardElement.innerText = `${socket.nickName}:${socket.points}`;
      board.appendChild(boardElement);
      beforeNickName = socket.nickName;
    }
  });
};

const resetBoard = () => (board.innerHTML = "");
