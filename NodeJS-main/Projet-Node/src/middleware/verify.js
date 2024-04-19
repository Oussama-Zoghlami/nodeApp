import User from "../models/user.js";
import jwt  from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN }  from "../config/config.js";
import blacklist from "../models/blacklist.js";

export async function Verify(req, res, next) {
    try {
        const authHeader = req.headers["cookie"];
        if(!authHeader) return res.sendStatus(401);
        const cookie = authHeader.split("=")[1];
        const accessToken = cookie.split(";")[0];
        const checkIfBlacklisted = await blacklist.findOne({ accessToken: accessToken});
        if(checkIfBlacklisted)
            return res
                .status(401)
                .json({ message: "This session has Expired. Please Login"});

        jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) =>{
            if(err) {
                return res
                    .status(401)
                    .json({message:"This session has expired. Please login"});
            }
            const { id } = decoded;
            const user = await User.findById(id);
            const { password, ...data } = user._doc;
            req.user = data;
            next();
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

export function VerifyRole(req, res, next) {
    try {
        const user = req.user; // we have access to the user object from the request
        const { role } = user; // extract the user role
        // check if user has no advance privileges
        // return an unathorized response
        if (role !== "0x88") {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

export default Verify;