import "dotenv/config";
import jwt from "jsonwebtoken";

import User from "../model/userschema.js";
import { hashPassword, comparePassword } from "../library/userutils.js";

// Secret key for signing JWTs
const secretKey = process.env.SECRET_ACCESS_TOKEN;

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create the new user
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // CREATE TOKEN WITH USERNAME AND USERID
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "24h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .status(201)
      .json({ message: "New user created successfully!", token });
  } catch (error) {
    console.error("Error during signup", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found or invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // CREATE TOKEN WITH USERNAME AND USERID
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "24h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .status(200)
      .json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login", error);
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
