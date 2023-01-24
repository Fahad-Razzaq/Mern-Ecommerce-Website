const router = require("express").Router();
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { encryptPassword } = require("../util");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenVendorAndAdmin,
} = require("./verifyToken");
const upload = require("../fileHandling");

// Create Product
router.post(
  "/add",
  verifyTokenVendorAndAdmin,
  upload.single("productImg"),
  async (req, res) => {
    console.log("Adding Product--------------------------------")
    let fileName = req.file.path;
    fileName = fileName.split("\\");
    req.body.productImg = fileName[1];
    req.body.sizedPrice = JSON.parse(req.body.sizedPrice);
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.send(savedProduct);
      console.log(newProduct)
    } catch (err) {
      res.send(err);
    }
  }
);



// Update Product
router.put(
  "/updateproduct/:id",
  verifyTokenVendorAndAdmin,
  upload.single("productImg"),
  async (req, res) => {
    let fileName = req.file.path;
    fileName = fileName.split("\\");
    req.body.productImg = fileName[1];
    req.body.sizedPrice = JSON.parse(req.body.sizedPrice);
    console.log(`Updating Product with id : ${req.params.id}`);
    console.log(req.body);
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedProduct);
    } catch (err) {
      res.send(err);
    }
  }
);

// Update Product Image
router.put(
  "/updateproductimage/:id",
  verifyTokenVendorAndAdmin,
  upload.single("productImg"),
  async (req, res) => {
    try {
      req.body.productImg = req.file.path;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedProduct);
    } catch (err) {
      res.send(err);
    }
  }
);

// Delete Product
router.delete(
  "/deleteproduct/:id",
  verifyTokenVendorAndAdmin,
  async (req, res) => {
    try {
      const productData = await Product.findByIdAndDelete(req.params.id);
      res.send("Product Deleted Successfully");
    } catch (err) {
      res.send(err);
    }
  }
);

// Get Product
router.get("/findproduct/:id", async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id);
    const img = "./images/1666559838767--signup.png";
    res.send(productData);
  } catch (err) {
    res.send(err);
  }
});

//Get All Products
router.get("/findproducts", async (req, res) => {
  console.log("Getting All Products with ", req.query.category);
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;

    if (queryNew) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(req.query.usercount);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.send(products);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
