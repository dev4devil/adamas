require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cart");
const Product = require("../models/product");
const Payment = require("../models/payment");

exports.postPayment = async (req, res) => {
  let { id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: parseInt(req.body.bill.amount) * 100,
      currency: "USD",
      description: "Adamas Order by: " + req.body.bill.name,
      payment_method: id,
      confirm: true,
    });
    // console.log("Payment", payment);
    await clearCart(payment, req.body.cart, req.body.bill);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

const clearCart = async (payment, cart, bill) => {
  cart.map(async (c) => {
    console.log("C: ", c);
    const data = await Product.findOneAndUpdate(
      { _id: c.productId },
      { $inc: { qty: -c.qty } }
    );
    console.log("CART MAP: ", data);
  });
  await Cart.findByIdAndUpdate(
    { _id: cart[0].cartId },
    { $set: { status: "processing" }, amount: bill.amount }
  );
  await Payment.create({
    cartId: cart[0].cartId,
    amount: bill.amount,
    stripePaymentId: payment.id,
  });
};

// payment
exports.payment = async (req, res) => {
  try {
    const data = await Payment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (e) {
    res
      .status(404)
      .json({ message: "Couldn't get payments", error: e.message });
  }
};
