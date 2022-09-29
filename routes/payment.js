const express = require("express");

const router = express.Router();

const { postPayment, payment } = require("../controllers/payment");

router.post("/", postPayment);
router.get("/", payment);

module.exports = router;
