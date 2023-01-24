const router = require("express").Router();
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const { encryptPassword } = require("../util");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenVendorAndAdmin,
} = require("./verifyToken");
const upload = require("../fileHandling");

// Create Cart
router.post("/createcart", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.send(savedCart);
  } catch (err) {
    res.send(err);
  }
});

// Update Cart
router.put("/updatecart/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedCart);
  } catch (err) {
    res.send(err);
  }
});

//Delete Cart
router.delete("/deletecart/:id", verifyTokenAndAuthorization, async (req,res) =>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.send("Cart has been Deleted")
    }catch(err){
        res.send(err)
    }
});

// Get User Cart
router.get("/findusercart/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const cartData = await Cart.findOne({userId:req.params.id});
        res.send(cart)
    }catch(err){
        res.send(err)
    }
});

// Get All Cart
router.get("/getallcart", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.send(carts)
    }catch(err){
        res.send(err)
    }
});

module.exports = router;
