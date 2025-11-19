import User from "../models/User.model.js"; // User model
import bcrypt from "bcryptjs"; // for hashing passwords
import { generateToken } from "../lib/utils.js"; // token generation utility
import { sendWelcomeEmail } from "../emails/emailHandlers.js"; // welcome email sender
import { ENV } from "./../lib/env.js";

// Signup Controller

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
    // 123456 = UDHWHhsIQUIhw928siwH

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

      try {
        await sendWelcomeEmail(
          savedUser,
          email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login Controller

export const login = async (req, res) => {
  const { email, password } = req.body;

  // codeRabbit code refaction
  // incases where the user hasn't provided anything we can use this t handle errors
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // find an user with this email in the DB
    // check if user exist if not return
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    // never tell the client which is incorrect: password or email
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    // if all this is provided correctly then generateToken for the particular id then return data
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Logout Controller

export const logout = async (req, res) => {
  // export const logout = async (_, res) => {} you can put it this way such that the one you are not using is replace with _ underscore
  // from our jwt token file we set our maxAge for token to - maxAge: 30 * 24 * 60 * 60 * 1000, in milliseconds but now it's 0 so it's automatically logged out if no token.
  res.cookie("jwt", "", { maxAge: 0 }); // ensure not to make mistake of mixing cookies with cookie
  res.status(200).json({ message: "Logged out successfully" });
};

// Update-profile Controllers
export const updateProfile = async (req, res) => {}