import mongoose from "mongoose";
import { stripLow } from "validator";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricecut: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },

    ratings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
