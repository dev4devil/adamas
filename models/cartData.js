const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const CartDataSchema = new mongoose.Schema(
  {
    cartId: {
      type: ObjectId,
      required: true,
    },
    productId: {
      type: ObjectId,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartData = mongoose.model("CartData", CartDataSchema);

module.exports = CartData;
