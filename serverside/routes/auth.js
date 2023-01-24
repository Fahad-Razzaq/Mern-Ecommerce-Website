const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../util");

// Register
router.post("/register", async (req, res) => {
  // Encrypting Password
  const hash = await encryptPassword(req.body.password)

  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
    designation: req.body.designation,
  });

  // Checking If User already exists
  let userData = await User.findOne({ email: req.body.email });

  if (userData == null || userData.email != req.body.email) {
    try {
      const savedUser = await newUser.save();
      res.send("Registration Successfull");
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("User Already Exists");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let userData = await User.findOne({ email: req.body.email });
    if (userData == null || userData.email != req.body.email) {
      res.send("User Does not Exists.");
    } else {
      let checkPass = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (checkPass) {

        const accessToken = jwt.sign({
          id: userData._id,
          designation:userData.designation,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1h"}
        );

        const { password, __v,  createdAt, updatedAt, ...others } = userData._doc;
        res.send({...others,accessToken});
      } else {
        res.send("Login Failed.");
      }
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
