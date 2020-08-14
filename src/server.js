import Express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const port = 1001;

const app = Express();

app.get("/", (req, res) => res.render("home"));
app.set("view engine", "pug");
app.set("views", "src/views");
app.use(Express.static("src/static"));
app.use(Express.static("node_modules"));

const handleListen = () => {
  console.log("✅ listening to http://localhost:1001");
};

const server = app.listen(port, handleListen);

const io = socketIO.listen(server);

io.on("connection", (socket) => {
  return socket.on(
    "newMessage",
    ({ message }) =>
      socket.broadcast.emit("messageNotification", {
        message,
        nickname: socket.nickname || "BLANK USER",
      }),
    socket.on("setNickName", ({ nickname }) => (socket.nickname = nickname))
  );
});
