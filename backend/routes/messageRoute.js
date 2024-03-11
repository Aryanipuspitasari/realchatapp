import express from "express";
import { sendMessage, getMessagesForUser } from "../controller/messageController.js";

const messageRoute = express.Router();

messageRoute
    .route("/")
    .post(sendMessage)

    messageRoute
    .post("/userId")
    .get(getMessagesForUser)

export default messageRoute;