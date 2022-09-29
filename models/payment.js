const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    cartId: {
      type: ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    stripePaymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
