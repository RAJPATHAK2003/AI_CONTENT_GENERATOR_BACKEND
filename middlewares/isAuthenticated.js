const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ---- IsAuthenticated middleware
const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    if (req.cookies.token) {
      // Use environment variable for the token secret
      const secret = process.env.JWT_SECRET || 'default_secret'; // Ensure you have a fallback secret
      const decoded = jwt.verify(req.cookies.token, secret);

      // Check if decoded contains the id field
      if (decoded?.id) {
        // Add the user to the req object
        req.user = await User.findById(decoded.id).select("-password");
        return next();
      } else {
        return res.status(401).json({ message: "Invalid token payload" });
      }
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid", error: error.message });
  }
});

module.exports = isAuthenticated;
