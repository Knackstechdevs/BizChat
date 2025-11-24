import Message from "../models/message.model.js";
import User from "../models/user.model.js";


// getAllContacts Controllers
export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password") // this ays to import all user but the one that's not equal to the loggedInUserId because it' include your user id as well

        res.status(200).json(filteredUsers); // And ths will return all the loggedInUsers aside from you
    } catch (error) {
        console.log("Error in getAllContacts", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

// getMessagesByUserId Controllers
export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id; // my user id
        const {id:userToChatId} = req.params; // my partners id // this is id because in our router file we set id but we set idx then here too it's will be idx
        
        // this says find the messages between me and this users and there are two different ways to do this
        const message = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessagesByUserId controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

// sendMessage Controllers
export const sendMessage = async (req, res) => {
    try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image ) {
        return res.status(400).json({message: "Text or image i required."})
    }

    if (senderId.equals(receiverId) ) {
        return res.status(400).json({message: "Cannot send message to yourself"})
    }

    const receiverExists = await User.exists({_id: receiverId});
    if (!receiverExists) {
        return res.status(404).json({message: "Receiver not found."})
    }

    let imageUrl;

    if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });

    await newMessage.save() // because the message is saved in the DB for the user to be able to see it. think of it as what i save in message DB you can see and when i delete you cannot, that's sending

    // todo: send message in real-time if user is online - socket.io

    res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
};