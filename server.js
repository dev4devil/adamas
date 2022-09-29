require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

const connectDB = require("./config/db");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");
const shared = require("./routes/shared");
const cart = require("./routes/cart");
const payment = require("./routes/payment");
const order = require("./routes/order");

connectDB();
app.use(passport.initialize());

require("./config/passport")(passport);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server Up and Running"));

// Passport middleware
// Passport config

app.use("/img", express.static(path.join(__dirname, "images")));
app.use("/api/user", user);
app.use("/api/category", category);
app.use("/api/product", product);
app.use("/api/shared", shared);
app.use("/api/cart", cart);
app.use("/api/payment", payment);
app.use("/api/order", order);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
