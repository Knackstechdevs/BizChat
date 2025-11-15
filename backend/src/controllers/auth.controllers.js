import User from "../models/User.model.js"; // User model
import bcrypt from "bcryptjs"; // for hashing passwords
import { generateToken } from "../lib/utils.js"; // token generation utility

// Signup controller

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //validate input fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if password length is at least 6 characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // check if email is valid - regex pattern is a pattern for validating emails found it on AI
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check if user already exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({ fullname, email, password: hashedPassword });

    //generate token for authentication and set it in cookie then create new user
    if (newUser) {
      // before coderabbits suggestion
      // generateToken(newUser._id, res);
      // await newUser.save();

      // after coderabbits suggestion
      // persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      // todo: send a welcome email to user
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
