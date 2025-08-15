import http from "http";
import { app } from "../app.js";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // user sends a message
  socket.on("new_message", (data) => {
    console.log("New Message: ", data);
    socket.broadcast.emit("new_message", data);
  });

  // friend request sent
  socket.on("friend_request_sent", (data) => {
    console.log("Message received: ", data);
    socket.broadcast.emit("friend_request_sent", data);
  });

  // message deleted
  socket.on("delete_message", (data) => {
    console.log("Message deleted: ", data);
    io.emit("delete_message", data);
  });

  // mark message as seen
  socket.on("mark_seen", (data) => {
    console.log("Message received: ", data);
    io.emit("mark_seen", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export { server };
