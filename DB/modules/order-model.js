const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: { type: Array },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    CardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    },
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
