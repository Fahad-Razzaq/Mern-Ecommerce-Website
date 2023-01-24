const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    productImg: { type: String, required: true },
    categories: { type: Array },
    sizedPrice: { type: Array },
    price: { type: Number, required: true },
    vendor: {type: String, required: true },
    vendorId: {type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product",ProductSchema);
