import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    name: { type: String },
    isGroup: { type: Boolean, default: false },
    lastMessageAt: { type: Date, default: Date.now },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
