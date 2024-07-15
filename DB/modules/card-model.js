const mongoose = require("mongoose");
const cardSchema = mongoose.Schema(
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
      default: 1,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: { type: Array },
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
    isOrdered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOrderDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const cardModel = mongoose.model("card", cardSchema);
module.exports = cardModel;
