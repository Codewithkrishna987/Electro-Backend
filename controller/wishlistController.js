import { Wishlist } from "../models/wishlistModel.js";

// Add to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, items: [productId] });
  } else {
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }
  }

  res.status(200).json(wishlist);
};

// Get wishlist
export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate("items");
  res.status(200).json(wishlist);
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const wishlist = await Wishlist.findOne({ userId: req.user._id });

  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

  wishlist.items = wishlist.items.filter(item => item != productId);
  await wishlist.save();

  res.status(200).json({ message: "Removed from wishlist", wishlist });
};
