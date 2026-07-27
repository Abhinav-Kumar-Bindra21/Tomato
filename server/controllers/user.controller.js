import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validateUser } from "../utils/validator.js";
import { createToken } from "../utils/createToken.js";

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate email and strong password
    validateUser(req.body);

    // Check user exits or not
    const isExits = await User.findOne({ email });

    if (isExits) {
      return res.status(400).json({ success: false, message: "User already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({ success: true, message: "User register successfully ", token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.status(400).json({ success: false, message: "User doesn't exit" });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(isUser._id);
    res.status(200).json({ success: true, message: "Logged in successfully ", token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
