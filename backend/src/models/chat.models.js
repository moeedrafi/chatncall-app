import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    isGroup: { type: Boolean, default: false },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    groupName: { type: String },
    groupImage: { type: String },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
