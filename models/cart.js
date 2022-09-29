const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
