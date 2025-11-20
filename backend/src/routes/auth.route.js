import express, { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js"; 

const router = express.Router();


router.use(arcjetProtection);

router.post("/signup", signup); //  arcjetProtection, middleware for rate limiting but to avoid repeatation we can simply say router.use(arcjetProtection); above the router instead of putting it in front of all the router

router.post("/login", login); // arcjetProtection

router.post("/logout", logout);  // arcjetProtection

// thinking about it for you to be able to update your profile you need to be authenticated
// so we make it protected so that so that one after to be authenticated if not authenticated it throws an error and you can't over forward to the updateProfile
router.put("/update-profile", arcjetProtection, protectRoute, updateProfile);

// to ensure only the authorized person can access the user details take for an instance when the user try to send a message and the page reloads maybe due to network issues the check route will be called onto before giving access meaning the person has to have a token of authorization before you can access the user details
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default Router;
