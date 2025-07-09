import express from "express";
import { protect } from "../middleware/authMiddleware";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controller/wishlistController";
import { get } from "mongoose";

const router = express.Router();

router.post("/",protect, addToWishlist)
router.get("/",protect, getWishlist)
router.delete("/:product:id",protect, removeFromWishlist)

export default router;
