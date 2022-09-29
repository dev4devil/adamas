const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const router = express.Router();
const {
  getAllProduct,
  postCreateProduct,
  putUpdateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.get("/", getAllProduct);
router.get("/:id", getProduct);

router.post("/", upload.single("image"), postCreateProduct);

router.put("/:id", upload.single("image"), putUpdateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
