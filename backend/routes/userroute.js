import express from "express";
import { login, signup, getUsers} from "../controller/usercontroller.js";
import { userValidator } from "../middlewares/uservalidator.js";
import { validateRequest } from "../middlewares/validator.js";

const userRouter = express.Router();

userRouter
.route("/")
.get(getUsers);

userRouter
.route("/signup")
.post(userValidator, validateRequest, signup)

userRouter
.route("/login")
.post(validateRequest, login);

export default userRouter;
