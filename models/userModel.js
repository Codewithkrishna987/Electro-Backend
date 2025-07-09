import mongoose from "mongoose";
import { isLowercase } from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel1 = mongoose.model("UserModel1", userSchema);

export default userModel1;
