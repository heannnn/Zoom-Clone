import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const server = http.createServer(app); // express 이용해서 http 서버 생성
const wss = new WebSocket.Server({ server }); // http 서버 위에 webSocket 서버 생성

wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", () => {
    console.log("DisConnected from the Browser");
  });
  socket.on("message", (message) => {
    console.log(message.toString());
  });
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
