import {body} from "express-validator"

export const userValidator = [
    body("username")
    .notEmpty()
    .withMessage("Username required !")
    .trim()
    .isLength({ min : 3})
    .escape(),

    body("email")
    .notEmpty
    .withMessage("Email required !")
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),

    body("password")
    .notEmpty
    .withMessage("Password required !")
    .trim()
    .isStrongPassword()
    .withMessage("Password is not safe enough !")
    .isLength({ min : 8 })
    .escape,
];