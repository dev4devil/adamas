const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const router = express.Router();

const {
  getAllCategory,
  postCreateCategory,
  putUpdateCategory,
  deleteCategory,
  getActiveCategories,
  getCategory,
  getActiveCategory,
} = require("../controllers/category");

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

router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.get("/get-category/:cat", getActiveCategories);
router.get("/active/:limit", getActiveCategory);
router.post("/", upload.single("image"), postCreateCategory);

router.put("/:id", upload.single("image"), putUpdateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
