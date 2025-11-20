import { v2 as cloudinary} from "cloudinary"; // naming as v2 alone doesn't really make more sense so we rename it has cloudinary { v2 as cloudinary } so all this code will later be used in the controller file
import { ENV } from "./env.js";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

export default cloudinary;