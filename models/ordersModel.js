import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel1;', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: { type: String, default: "Cash on Delivery" }, // or Razorpay, Stripe, etc.
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
