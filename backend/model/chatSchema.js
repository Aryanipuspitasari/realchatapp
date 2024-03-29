import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userMessage: String,
    botReply: String,
    timestamp: { type: Date, default: Date.now }
}, {
    strictQuery: true,
    versionKey: false
});

const Chat = mongoose.model("Chat", chatSchema, "chats");

export default Chat;
