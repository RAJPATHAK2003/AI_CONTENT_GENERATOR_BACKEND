const asyncHandler = require("express-async-handler");
const calculateNextBillingDate = require("../utils/calculateNextBillingDate");
const  shouldRenewSubcriptionPlan= require("../utils/shouldRenewSubcriptionPlan");
const Payment = require("../models/Payment");

// Free Subscription
const handleFreeSubscription=asyncHandler(async(req,res)=>{
    const user = req?.user;
    console.log("free plan", user);
  
    //Check if user account should be renew or not
    try {
      if (shouldRenewSubcriptionPlan(user)) {
        //Update the user account
        user.subscriptionPlan = "Free";
        user.monthlyRequestCount = 5;
        user.apiRequestCount = 0;
        user.nextBillingDate = calculateNextBillingDate();
  
        //Create new payment and save into DB
        const newPayment = await Payment.create({
          user: user?._id,
          subscriptionPlan: "Free",
          amount: 0,
          status: "success",
          reference: Math.random().toString(36).substring(7),
          monthlyRequestCount: 0,
          currency: "usd",
        });
        user.payments.push(newPayment?._id);
        //save the user
        await user.save();
        //send the response
        res.json({
          status: "success",
          message: "Subscription plan updated successfully",
          user,
        });
      } else {
        return res.status(403).json({ error: "Subcription renewal not due yet" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
});
module.exports=handleFreeSubscription;