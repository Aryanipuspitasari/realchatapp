import express from "express";
import { chat, getUserConversations } from "../controller/chatController.js";
import { authenticate } from "../middlewares/authenticate.js";

const chatRouter = express.Router()
chatRouter
    .route("/")
    .get(authenticate, getUserConversations)
    .post(authenticate, chat)

export default chatRouter;