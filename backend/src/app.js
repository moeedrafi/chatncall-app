import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import messageRouter from "./routes/message.routes.js";
import conversationRouter from "./routes/conversation.routes.js";
import friendRequestRouter from "./routes/friendRequest.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/friends", friendRequestRouter);
app.use("/api/v1/conversations", conversationRouter);

app.use(errorHandler);

export { app };
