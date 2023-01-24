const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    // products: [
    //   {
    //     productId: {
    //       type: String,
    //     },
    //     quantity: {
    //       type: Number,
    //       default: 1,
    //     },
    //     status: { type: String, default: "Pending" },
    //   },
    // ],
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    vendorId: { type: String, required: true },
    stripeToken_id: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
