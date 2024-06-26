import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Proctected Routes token base
const requireSignIn = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send("Invalid Token");
    }
};

// Admin access
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized access"
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error in Admin access",
            error
        });
    }
}



export {requireSignIn, isAdmin};