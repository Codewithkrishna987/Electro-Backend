import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controller/productController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// public route
router.get("/", getAllProducts);
router.get("/:id",getProductById)

// routes access by admine
router.get("/", protect, createProduct);
router.get("/:id", protect, updateProduct);
router.get("/:id", protect, deleteProduct)

export default router;