const express = require("express");

const router = express.Router();

const {
  getAllUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  getUser,
  login,
  loginCustomer,
  postRegister,
} = require("../controllers/user");
const { protect } = require("../middleware/auth");

router.get("/", protect, getAllUser);

router.get("/:id", getUser);

router.post("/", postCreateUser);
router.post("/register", postRegister);
router.put("/:id", putUpdateUser);

router.delete("/:id", deleteUser);

router.post("/login", login);
router.post("/loginCustomer", loginCustomer);

module.exports = router;
