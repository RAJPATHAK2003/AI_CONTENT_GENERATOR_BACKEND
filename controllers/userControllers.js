const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const ContentHistory = require('../models/ContentHistory');
// Registration
const register=asyncHandler(async (req,res)=>{
    
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
        username,
        password: hashedPassword, // Save hashed password
        email,
    });

    // Set trial expiration
    newUser.trialExpires = new Date(
        new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
    );

    await newUser.save();

    // Send response
    res.json({
        status: true,
        message: "Registration was successful",
        user: {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        },
    });
});

//Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // Respond with user details if authentication is successful
    //JWT token
    const token=jwt.sign({id:user._id},'6d36ch',{
        expiresIn:'3d'
    })
    
    // set token inside the cookie
    res.cookie('token',token,{
        httpOnly:true,
        secure:'development'==='production',
        sameSite:'strict',
        maxAge:24 *60*60*1000  //1 day till cookie is stored
    })

    res.json({
        status: "success",
        message: "Login successful",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
        },
    });
});

//Logout
const logout=asyncHandler(async(req,res)=>{
    res.cookie('token','',{maxAge:1});
    res.status(200).json({message:'Logout SuccessFull'})
})

//Profile
const userProfile=asyncHandler(async(req,res)=>{
    // const id='669153291be02444488a85f9';
    const user = await User.findById(req?.user?.id)
    .select("-password")
    .populate("payments")
    .populate("contenthistory");
    if(user){
        res.status(200).json({
            status:'success',
            user,
        })
    }
    else{
        res.status(404);
        throw new Error('Profile Not Exisst');
    }

})

//Check Auth
const checkAuth = asyncHandler(async (req, res) => {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    if (decoded) {
      res.json({
        isAuthenticated: true,
      });
    } else {
      res.json({
        isAuthenticated: false,
      });
    }
  });
module.exports={
    register,
    login,
    logout,
    userProfile,
    checkAuth
};