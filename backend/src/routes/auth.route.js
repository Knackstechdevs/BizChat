import express, { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// thinking about it for you to be able to update your profile you need to be authenticated
// so we make it protected so that so that one after to be authenticated if not authenticated it throws an error and you can't over forward to the updateProfile
router.put("/update-profile", protectRoute, updateProfile);

export default Router;
