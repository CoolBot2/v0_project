const express = require("express");
const app = express();
const http = require("http");
const connect = require("./config/connectDB");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const conversationRoute = require("./routes/conversation.route");
require("dotenv").config({ path: "./config/.env" });
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/message", messageRoute);
app.use("/conversation", conversationRoute);
connect();
const io = new Server(server, {
  cors: {
    origins: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);
  socket.on("join", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    io.to(users.socketId).emit("receiveMessage", {
      senderId,
      content,
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
