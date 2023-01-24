const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../util");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// Update User
router.put("/updateuser/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log(`Updating User with id : ${req.params.id}`)
  console.log(req.body)
  if (req.body.password) {
    req.body.password = await encryptPassword(req.body.password);
  }
  console.log(req.body.password)

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.send(err);
  }
});

// Delete User
router.delete(
  "/deleteuser/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    console.log("Deleting User")
    try {
      if (await User.findByIdAndDelete(req.params.id)) {
        res.send("User Has Been Deleted");
      } else {
        res.send("User Does not exists");
      }
    } catch (err) {
      res.send(err);
    }
  }
);

// Get User
router.get("/finduser/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (userData != null) {
      const { password, __v,  updatedAt, ...others } = userData._doc;
      res.send(others);
    } else {
      res.send("User Does not Exists");
    }
  } catch (err) {
    res.send(err);
  }
});

// Get All Users
router.get("/findallusers", verifyTokenAndAdmin, async (req, res) => {
  console.log("Getting Users")
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(req.query.usercount)
      : await User.find();
      // console.log(users)
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

// Get User Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.send(data)
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
