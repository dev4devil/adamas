const Category = require("../models/category");
const fs = require("fs");

exports.getAllCategory = async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Category not found", error: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const data = await Category.find({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: "Category not found", error: err.message });
  }
};
exports.getActiveCategories = async (req, res) => {
  try {
    const data = await Category.find({ status: true }, { _id: 1, name: 1 });
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Category not found", error: e.message });
  }
};
exports.getActiveCategory = async (req, res) => {
  try {
    const data = await Category.find({ status: true }).limit(req.params.limit);
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Category not found", error: e.message });
  }
};
exports.postCreateCategory = async (req, res) => {
  try {
    req.body.image = req.file.filename;
    const data = await Category.create(req.body);
    res.json({ message: "Category added successfully", data });
  } catch (e) {
    res
      .status(404)
      .json({ message: "Check your Connection", error: e.message });
  }
};

exports.putUpdateCategory = async (req, res) => {
  try {
    if (req.file) {
      const data = await Category.findById(req.params.id);
      if (data) {
        fs.unlink("images/" + data.image, (err) => {
          if (err) console.error(err);
        });
      }
      req.body.image = req.file.filename;
    }
    const data = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Category updated successfully", data });
  } catch (e) {
    res.status(404).json({ message: "Category not found", error: e.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndRemove(req.params.id, req.body);
    if (data) {
      fs.unlink("images/" + data.image, (err) => {
        if (err) console.error(err);
        res.json({ message: "Category removed successfully", data });
      });
    }
  } catch (e) {
    res.status(404).json({ message: "Category not found", error: e.message });
  }
};
