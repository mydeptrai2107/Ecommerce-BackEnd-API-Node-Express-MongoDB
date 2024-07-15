const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
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
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.String,
    ref: "category",
    required: true,
  },
  image: { type: Array },
  productAddBy: {
    type: String,
    required: true,
  },
});
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
