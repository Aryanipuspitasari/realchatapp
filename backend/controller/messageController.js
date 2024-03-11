import "dotenv/config";
import { Message } from "../model/messageSchema.js";
import jwt from "jsonwebtoken";

// Secret key for signing JWTs
const secretKey = process.env.SECRET_ACCESS_TOKEN;

export const sendMessage = async (req, res, next) => {
    try {
        // Extract sender ID from JWT token
        const { id: sender } = jwt.verify(req.cookies.token, process.env.SECRET_ACCESS_TOKEN);
        const { receiver, message } = req.body;
    
        // Save the message with the sender's ID
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
    
        res.status(201).json({ message: "Message sent successfully" });
      } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
      }
};



























// GET message for specific user
export const getMessagesForUser = async (req, res) => {
    try {
        // Extract receiver ID from JWT token
        const { id: receiver } = jwt.verify(req.cookies.token, process.env.SECRET_ACCESS_TOKEN);
    
        // Fetch messages where the receiver matches the logged-in user's ID
        const messages = await Message.find({ receiver }).populate('sender', 'username');
        res.json(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
      }
  };
