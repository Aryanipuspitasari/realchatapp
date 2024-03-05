import express from "express";
import { chat } from "../controller/chatController.js";

const chatRouter = express.Router()
chatRouter
    .route("/")
    .post(chat)


export default chatRouter;