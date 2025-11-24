import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js"
import protectRoute from "../middleware/auth.middleware.js"

const router = express.Router();

// ensure this are in this order to avoid errors

router.get("/contacts", protectRoute, getAllContacts); // 1 // with the protectedRoute only user that are authenticated can access the getAllContacts tht way the _id is from the req.body so if you are not using this middleware the user id should be written as id not _id

router.get("/chats", protectRoute, getChatPartners); // 4

router.get("/:id", protectRoute, getMessagesByUserId); // 2

router.post("/send:id", protectRoute, sendMessage); // 3

export default router;