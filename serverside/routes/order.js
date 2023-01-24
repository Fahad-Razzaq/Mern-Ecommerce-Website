const router = require("express").Router();
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../util");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenVendorAndAdmin,
} = require("./verifyToken");
const upload = require("../fileHandling");
const User = require("../models/User");
const Product = require("../models/Product");
const { db } = require("../models/Order");

// Create
router.post("/createorder", verifyToken, async (req, res) => {
  // const newOrder = new Order(req.body);

  // try {
  //   const savedOrder = await newOrder.save();
  //   res.send(savedOrder);
  // } catch (err) {
  //   res.send(err);
  // }

  console.log("----- Creating Order -----");
  console.log(req.body);

  try {
    const userId = req.body.userId;
    const stripeToken_id = req.body.stripeToken_id;
    const address = req.body.address;
    req.body.products.map((item) => {
      const productId = item._id;
      const quantity = item.quantity;
      const vendorId = item.vendorId;
      const amount = item.price * item.quantity;

      let productData = {
        userId,
        productId,
        quantity,
        vendorId,
        stripeToken_id,
        amount,
        address,
      };
      // console.log("----- values -----");
      // console.log(productData);

      const makeOrder = async (productData) => {
        let newOrder = new Order(productData);

        try {
          const savedOrder = await newOrder.save();
        } catch (err) {
          console.log(first)(err);
        }
      };

      makeOrder(productData);
    });
    res.send("success");
  } catch (err) {
    res.send("error");
  }
});

// Update Order
router.put("/updateorder/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedOrder);
  } catch (err) {
    res.send(err);
  }
});

//Delete Order
router.delete("/deletecart/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("Order has been deleted.");
  } catch (err) {
    res.send(err);
  }
});

//Get User Order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const ordersData = await Order.find({ userId: req.params.id });
    res.send(ordersData);
  } catch (err) {
    res.send(err);
  }
});

//Get All Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  console.log("----- Getting All Orders -----");
  try {
    const  ordersdata = await Order.find();

    const data = await Order.aggregate([
      {
        $lookup:
          {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'customer'
          }
      }
    ]);

    console.log("Orders Data -----------------------" + JSON.stringify(data));
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// Get Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $month: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.send(income);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
