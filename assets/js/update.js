const board = document.getElementById("jsBoard");

export const handleUpdate = ({ sockets }) => {
  resetBoard();
  sockets.forEach((socket) => {
    let boardElement = document.createElement("div");
    boardElement.innerText = `${socket.nickName}:${socket.points}`;
    board.appendChild(boardElement);
  });
};

const resetBoard = () => (board.innerHTML = "");
