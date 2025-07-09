import express from "express";
import { protect } from "../middleware/authMiddleware";

import { addToCart, getCart, removeFromCart } from "../controller/cartControllers";

const router = express.Router()

router.post("/",protect, addToCart);
router.get("/",protect, getCart);
router.delete("/:productId",protect, removeFromCart);

export default router;