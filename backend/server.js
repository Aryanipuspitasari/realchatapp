import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// IMPORT MIDDLEWARE
import {errorHandler} from "./middlewares/errorHandler.js";
import {invalidRoute} from "./routes/invalidRoute.js";

// IMPORT CONNECT
import {connect} from "./connect.js"

// IMPORT ROUTES
import userRouter from "./routes/userroute.js";
import chatRouter from "./routes/chatRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARE USE
app.use(express.json());
app.use(express.urlencoded( { extended : true } ) );
app.use(cookieParser());
app.use(cors({ credentials: true, origin: [ "http://localhost:5177"] }));
connect();

// R O U T E S
app.use("/users", userRouter);
app.use("/chat", chatRouter)
app.use("*", invalidRoute);

// M I D D L E W A R E
app.use(errorHandler);


app.listen(PORT, () => console.log(`The server is listening http://localhost:${PORT}... 🎥`, PORT ));