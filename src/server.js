import Express from "express";

const app = Express();
const port = 1001;

app.get("/", (req, res) => res.render("home"));

app.set("view engine", "pug");
app.set("views", "src/views");
app.use(Express.static("src/static"));

app.listen(port, () => console.log("✅ listening to http://localhost:1001"));
