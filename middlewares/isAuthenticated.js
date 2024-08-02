const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//----IsAuthenticated middleware
const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
   
    // const decoded = jwt.verify(req.cookies.token, '6d36ch');
    const decoded = jwt.verify(req.cookies.token, '6d36ch');  //the actual login user
    //add the user to the req obj
    req.user = await User.findById(decoded?.id).select("-password");
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = isAuthenticated;
