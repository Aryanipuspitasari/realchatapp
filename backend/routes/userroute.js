import express from "express";
import { login, signup } from "../controller/usercontroller.js";
import { userValidator, userValidatorForLogin } from "../middlewares/uservalidator.js";
import { validateRequest } from "../middlewares/validator.js";

const userRouter = express.Router();

userRouter.route("/signup").post(userValidator, validateRequest, signup);

userRouter.route("/login").post(userValidatorForLogin, validateRequest, login);

export default userRouter;
