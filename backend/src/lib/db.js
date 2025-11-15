import mongoose from "mongoose"


export const connectDB = async () => {
    try {

        // coderabbit suggestion to avoid undefined error
        const {MONGO_URL} = process.env;
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); //1 indicates failure 0 means success
    }
}