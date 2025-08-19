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
  const userId = socket.handshake.query.userId;
  socket.userId = userId;
  console.log("A user connected:", socket.id + " + " + userId);

  // join conversation
  socket.on("join conversation", async (conversationId) => {
    console.log(
      `User ${socket.id} ${socket.userId} joined ${conversationId} conversation`
    );
    await socket.join(conversationId);
  });

  // leave conversation
  socket.on("leave conversation", async (conversationId) => {
    console.log(`User ${socket.userId} left ${conversationId} conversation`);
    await socket.leave(conversationId);
  });

  // send message
  socket.on("send message", (conversationId, message) => {
    console.log(`Msg in ${conversationId} from: ${message}`);
    const newMessage = {
      _id: Date.now().toString(),
      body: message,
      sender: socket.handshake.query.userId,
      conversation: conversationId,
      seenBy: [],
    };

    socket.to(conversationId).emit("send message", newMessage);
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

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

export { server };
