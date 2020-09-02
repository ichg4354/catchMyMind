import Express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import { handleSocketConnection } from "./socketController.js";
import events from "./events.js";
import words from "./words.js";

const port = 1001;

const app = Express();

app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

app.set("view engine", "pug");
app.set("views", "src/views");
app.use(Express.static("src/static"));
app.use(logger("dev"));

const handleListen = () => {
  console.log("✅ listening to http://localhost:1001");
};

const server = app.listen(port, handleListen);

const io = socketIO.listen(server);

io.on("connection", (socket) => handleSocketConnection(socket, io));
