const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.getAllUser = async (req, res) => {
  try {
    const data = await User.count();
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Users not found", error: err.message });
  }
};

exports.getCategoryCount = async (req, res) => {
  try {
    const data = await Category.count();
    res.json(data);
  } catch (e) {
    res
      .status(404)
      .json({ message: "Categories not found", error: err.message });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const data = await Product.count();
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: err.message });
  }
};

exports.getLatestArrival = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $match: {
          status: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      { $limit: 10 },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          price: 1,
          status: 1,
          categoryName: "$categoryDetails.name",
        },
      },
    ]);
    res.json({ message: "Products fetched successfully!", data });
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }

  // .then((data) => res.json(data))
  // .catch((err) =>
  //   res
  //     .status(404)
  //     .json({ message: "Products not found", error: err.message })
  // );
};

exports.getProductsUnderCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $match: {
          category: mongoose.Types.ObjectId(req.params.id),
          status: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          price: 1,
          status: 1,
          createdAt: 1,
          categoryName: "$categoryDetails.name",
        },
      },
    ]);
    res.json({ message: "Products fetched successfully!", data });
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $match: {
          featured: true,
          status: true,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          price: 1,
          status: 1,
          categoryName: "$categoryDetails.name",
        },
      },
    ]);
    res.json({ message: "Products fetched successfully!", data });
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }

  // .then((data) => res.json(data))
  // .catch((err) =>
  //   res
  //     .status(404)
  //     .json({ message: "Products not found", error: err.message })
  // );
};

exports.getProducts = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {
        $match: {
          status: true,
          category: mongoose.Types.ObjectId(req.params.cat),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image: 1,
          price: 1,
          status: 1,
          categoryName: "$categoryDetails.name",
        },
      },
    ]);
    res.json({ message: "Products fetched successfully!", data });
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }
};

exports.getAllCategoryWithCount = async (req, res) => {
  try {
    const data = await Category.aggregate([
      {
        $match: {
          status: true,
          _id: { $ne: mongoose.Types.ObjectId(req.params.id) },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "productDetails",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$productDetails" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          productCount: 1,
        },
      },
    ]);
    res.json({ message: "Products fetched successfully!", data });
  } catch (e) {
    res.status(404).json({ message: "Products not found", error: e });
  }
};
