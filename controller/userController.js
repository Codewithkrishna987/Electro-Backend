import userModel1 from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to create a JWT token
const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  const user = await userModel1.findOne({ email });
  // Check if user exists
  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }
  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Password Incorrect please check" });
  }
  const token = createToken(user._id);
  return res
    .status(200)
    .json({ message: "User logged in Successfully", token });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Inserting user:", req.body);

    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // Check if password is strong enough
    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({
          error:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
        });
    }
    // Check if password length is less than 8 characters
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // Checking user already status
    const existingUser = (await userModel1.findOne({ email })) || null;
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel1.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, user: { username, email }, token });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { loginUser, registerUser };
