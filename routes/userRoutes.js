import { use } from "react";
import { registerUser, loginUser, logoutUser} from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser)

export default userRouter; 