const express = require("express");

const router = express.Router();

const {
  getAllUser,
  getProductsUnderCategory,
  getAllProduct,
  getLatestArrival,
  getFeatured,
  getCategoryCount,
  getProducts,
  getAllCategoryWithCount,
} = require("../controllers/shared");

router.get("/user/", getAllUser);
router.get("/category/", getCategoryCount);
router.get("/product/", getAllProduct);
router.get("/latest-arrival/", getLatestArrival);
router.get("/featured/", getFeatured);
router.get("/productsUnderCategory/:id", getProductsUnderCategory);
router.get("/getProducts/:cat", getProducts);
router.get("/productcount/:id", getAllCategoryWithCount);

module.exports = router;
