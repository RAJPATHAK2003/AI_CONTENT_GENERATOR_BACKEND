const express=require("express");
// const { register,login, logout,userProfile } = require("../controllers/userControllers");
const isAuthenticated = require("../middlewares/isAuthenticated");
const handleFreeSubscription = require("../controllers/handleStripePayment");

const stripeRouter=express.Router();

stripeRouter.post("/free-plan",isAuthenticated,handleFreeSubscription);
module.exports=stripeRouter;