const mongoose = require("mongoose");
const favoriteSchema = mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
  },
  {
    timestamps: true,
  }
);
const favoriteModel = mongoose.model("favorite", favoriteSchema);
module.exports = favoriteModel;
