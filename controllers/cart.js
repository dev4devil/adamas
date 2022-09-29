const Cart = require("../models/cart");
const Product = require("../models/product");
const CartData = require("../models/cartData");
const mongoose = require("mongoose");
//
exports.getCart = async (req, res) => {
  try {
    const data = await Cart.find({ userId: req.params.id, status: "pending" });
    // console.log("data", data);
    if (data.length !== 0) {
      const cart = await CartData.aggregate([
        {
          $match: {
            cartId: data[0]._id,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails",
        },
        {
          $project: {
            _id: 1,
            qty: 1,
            cartId: 1,
            productId: 1,
            productTitle: "$productDetails.title",
            productImage: "$productDetails.image",
            productPrice: "$productDetails.price",
            productQty: "$productDetails.qty",
          },
        },
      ]);
      // console.log("cart", cart);
      res.json({ message: "Products fetched successfully!", cart });
    }
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }
};

exports.getCartCount = async (req, res) => {
  try {
    const data = await Cart.find({ userId: req.params.id, status: "pending" });
    if (data.length !== 0) {
      const cart = await CartData.find({ cartId: data[0]._id }).count();
      res.json(cart);
    } else {
      res.json(0);
    }
  } catch (e) {
    res.status(404).json({ message: "Cart not found", error: e.message });
  }
};

exports.putCart = async (req, res) => {
  try {
    const data = await checkProduct(req.body.cartId, req.body);
    // console.log("put Data ", data);
    if (data.length != 0) {
      const check = await checkQty(req.body.productId, req.body.qty);
      if (check) {
        const r = await updateCart(req.body.cartId, req.body, req.body.qty);
        // console.log("r", r);
        res.json(r);
      }
    }
    // if (data.length != 0) {
    //   if (data[0].qty >= req.body.qty) {
    //     CartData.findByIdAndUpdate(req.body.id, { qty: req.body.qty })
    //       .then((data) => res.json({ message: "Cart updated", data }))
    //       .catch((err) =>
    //         res
    //           .status(404)
    //           .json({ message: "Couldn't update cart", error: err.message })
    //       );
    //   } else {
    //     res.json({ message: "Max limit Reached" });
    //   }
    // }
  } catch (e) {
    console.log(e);
  }
};

exports.postCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.body.userId,
      status: "pending",
    });
    console.log("cartid ha", cart);
    if (cart != null) {
      console.log("cartid ha", cart);
      const cartId = cart._id;
      const product = await checkProduct(cartId, req.body);
      if (product.length !== 0) {
        const newQty = product[0].qty + req.body.qty;
        const check = await checkQty(req.body.productId, newQty);
        if (check) {
          const r = await updateCart(cartId, req.body, newQty);
          res.json(r);
        } else {
          res.json({ message: "Max limit reached", variant: "info" });
        }
      } else {
        // console.log("cart my nai ha product");
        const check = await checkQty(req.body.productId, req.body.qty);
        if (check) {
          const r = await addCart(cartId, req.body);
          // console.log("r", r);
          res.json(r);
        }
      }
    } else {
      const data = await Cart({
        userId: req.body.userId,
        status: "pending",
      }).save();
      const check = await checkQty(req.body.productId, req.body.qty);
      if (check) {
        //data._id is cartId
        const r = await addCart(data._id, req.body);
        res.json(r);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const checkQty = async (productId, qty) => {
  try {
    const data = await Product.find({ _id: productId });
    if (data[0].qty >= qty) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

const updateCart = async (cartId, body, newQty) => {
  try {
    const data = await CartData.findOneAndUpdate(
      {
        cartId: cartId,
        productId: body.productId,
      },
      { $set: { qty: newQty } }
    );
    // console.log(data);
    return {
      message: "Product quantity updated in cart successfully",
      data,
      variant: "success",
    };
  } catch (e) {
    console.log(e);
  }
};

const checkProduct = async (cartId, body) => {
  try {
    const data = await CartData.find({
      cartId: cartId,
      productId: body.productId,
    });
    // console.log("checkProduct Data: ", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const addCart = async (cartId, body) => {
  try {
    const cart = {
      cartId: cartId,
      productId: body.productId,
      qty: body.qty,
    };
    const data = await CartData.create(cart);
    if (data) {
      return {
        message: "Product added to cart successfully",
        data,
        variant: "success",
      };
    } else {
      return {
        message: "Request Failed! Check your Connection",
        error: e.message,
        variant: "danger",
      };
    }
  } catch (e) {
    console.log(e);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const data = await CartData.findByIdAndRemove(req.params.id, req.body);
    res.json({ message: "Product removed from cart successfully", data });
  } catch (e) {
    res.status(404).json({
      message: "Couldn't remove product from cart",
      error: e.message,
    });
  }
};
