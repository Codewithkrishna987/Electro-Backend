import jwt from "jsonwebtoken"
import { userModel1 } from "../models/userModel"

export const protect = async(req, res, next) =>{
    const token = req.req.cookies.token;
    if(!token) return res.status(401).json({message: "Unacuthrized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel1.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token"})
    }
}