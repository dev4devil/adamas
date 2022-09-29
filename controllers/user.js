// require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");

const validateAddUser = require("../validations/addUser");
const validateLogin = require("../validations/login");
const validateRegister = require("../validations/registerUser");

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Couldn't get users", error: e.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await User.find({ _id: req.params.id }, { password: 0 });
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "User not found", error: e.message });
  }
};

exports.loginCustomer = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email, role: "customer" });
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.firstName + " " + user.lastName,
      };
      jwt.sign(
        payload,
        key.secretOrKey,
        { expiresIn: 31556926 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    }
  } catch (e) {
    res.status(400).json({ passwordincorrect: "Password incorrect" });
  }
};

exports.login = async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      email: email,
      role: { $ne: "customer" },
    });
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
        firstName: user.firstName,
      };
      jwt.sign(
        payload,
        key.secretOrKey,
        { expiresIn: 31556926 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    }
  } catch (e) {
    res.status(400).json({ passwordincorrect: "Password incorrect" });
  }
};

exports.postCreateUser = async (req, res) => {
  const { errors, isValid } = validateAddUser(req.body);

  if (!isValid) {
    return res.status(400).json(errors.firstName);
  }
  try {
    const usr = await User.findOne({ email: req.body.email });
    if (usr) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        role: req.body.role,
        status: req.body.status,
      });
      const data = await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
      if (data) {
        res.json({ message: "User added successfully", data });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

exports.postRegister = async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const usr = await User.findOne({ email: req.body.email });
    if (usr) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        role: req.body.role,
        status: req.body.status,
        createdBy: req.body.createdBy,
      });
      const data = await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
        });
      });
      if (data) {
        console.log(data);
        const payload = {
          id: data.id,
          email: data.email,
          name: data.firstName + " " + data.lastName,
        };
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              message: "Registered Successfully",
            });
          }
        );
      }
    }
  } catch (e) {
    res.status(400).json({ message: "Registeration unsuccessful" });
  }
};

exports.putUpdateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "User updated successfully", data });
  } catch (e) {
    res.status(404).json({ message: "User not found", error: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndRemove(req.params.id);
    res.json({ message: "User removed successfully", data });
  } catch (e) {
    res.status(404).json({ message: "User not found", error: e.message });
  }
};
