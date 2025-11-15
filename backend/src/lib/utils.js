import jwt from "jsonwebtoken"; // this will allow us to generate tokens

export const generateToken = (userId, res) => {

    // Coderabbit suggestion to avoid undefined error
    const {JWT_SECRET} = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d", // token will expire in 30 days
    });

    // prevent XSS attacks by setting httpOnly to true
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        httpOnly: true, // cookie is accessible only by the web server and prevent XSS attacks : cross-site scripting attacks
        sameSite: "strict", // helps protect against CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true, // set secure flag in production
    });

    return token;
};