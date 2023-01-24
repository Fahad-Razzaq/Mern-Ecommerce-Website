const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log(req)
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.send("Token is Invalid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.send("You are Not Authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.designation === "Admin") {
      next();
    } else {
      res.send("You are Unauthorized to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.designation === "Admin") {
      next();
    } else {
      res.send("You are Unauthorized to do that");
    }
  });
};

const verifyTokenAndVendor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.designation === "Vendor") {
      next();
    } else {
      res.send("You are Unauthorized to do that");
    }
  });
};

const verifyTokenVendorAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.designation+"------------------------------------")
    if (req.user.designation === "Vendor" || req.user.designation === "Admin") {
      next();
    } else {
      res.send("You are Unauthorized to do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndVendor,
  verifyTokenVendorAndAdmin,
};
