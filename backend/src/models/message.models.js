import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    seenBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        seenAt: { type: Date },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
