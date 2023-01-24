// Importing Modules Required for current API
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing API Routes modules
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// Setting up Middleware
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/static",express.static("images"));

// Setting up Database
const mongooseDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connection is Successfull!");
    })
    .catch((err) => {
      console.log(err);
    });
};
mongooseDB();

// Setting up API for connecting Frontend and Backend Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

// Setting up Server listening port
app.listen(process.env.PORT || 5000, () => {
  console.log("Pak Eats API Server is running at port", process.env.PORT);
});
