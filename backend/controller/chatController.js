import "dotenv/config";
import OpenAI from "openai";
import Chat from "../model/chatSchema.js";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Please provide a message" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    /*
    console.log(req.user);
    console.log("User:", req.user);
    console.log("Response from OpenAI:", response);
    */
    
    // Save the user's message and the chatbot's reply to the database
    const newChat = new Chat({ 
      user: req.user.id, 
      userMessage: message,
      botReply: response.choices[0].message.content 
    });
    await newChat.save();

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Chat.find({ user: req.user.id });
    res.status(200).json( conversations );
  } catch (error) {
    console.error("Error fetching user conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



