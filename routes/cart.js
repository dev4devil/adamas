const express = require("express");

const router = express.Router();

const {
  getCart,
  postCart,
  putCart,
  deleteCart,
  getCartCount,
} = require("../controllers/cart");

router.get("/:id", getCart);
router.get("/count/:id", getCartCount);
router.post("/post", postCart);
router.put("/", putCart);
router.delete("/:id", deleteCart);

module.exports = router;
