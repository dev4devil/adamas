const Product = require("../models/product");
const fs = require("fs");

exports.getAllProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Product not found", error: e.message });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find({ _id: req.params.id });
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Product not found", error: e.message });
  }
};
exports.postCreateProduct = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    const data = await Product.create(req.body);
    res.json({ message: "Product added successfully", data });
  } catch (e) {
    res
      .status(404)
      .json({ message: "Check your Connection", error: e.message });
  }
};

exports.putUpdateProduct = async (req, res) => {
  try {
    if (req.file) {
      const data = await Product.findById(req.params.id);
      if (data) {
        fs.unlink("images/" + data.image, (err) => {
          if (err) console.error(err);
        });
      }
      req.body.image = req.file.filename;
    }
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Product updated successfully", data });
  } catch (e) {
    res.status(404).json({ message: "Product not found", error: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try{
    const data = await Product.findByIdAndRemove(req.params.id, req.body)
    if(data){
      fs.unlink("images/" + data.image, (err) => {
        if (err) console.error(err);
        res.json({ message: "Product removed successfully", data });
      });
    }
  }
  catch(err){
    res.status(404).json({ message: "Product not found", error: err.message })
  }
};
