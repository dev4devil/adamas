const express = require("express");

const router = express.Router();

const {
  getCart,
  postCart,
  putCart,
  deleteCart,
  getCartCount,
  getOrders,
  putOrder,
} = require("../controllers/order");

router.get("/:id", getCart);
router.get("/", getOrders);
router.put("/:id/:sta", putOrder);
// router.get("/count/:id", getCartCount);
// router.post("/post", postCart);
// router.put("/", putCart);
// router.delete("/:id", deleteCart);

module.exports = router;
