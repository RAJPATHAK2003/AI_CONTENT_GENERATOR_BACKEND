const express=require("express");
const usersRouter = require("./routes/usersRouter");
const cron=require("node-cron");
const cookieParser=require("cookie-parser");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");
 require("./utils/connectDB")();
const app=express();

const cors=require("cors");

// cron.schedule('0 0 * * * *',async()=>{
    
//     try {
//        const updatedUser=await User.updateMany({
//             trialActive:true,
//             trialExpires:{$lt:new Date()}
//         },{
//             trialActive:false,
//             subscriptionPlan:'Free',

//         })
//         console.log(updatedUser);
//     } catch (error) {
//         console.log(error);
//     }
// });  // these stars denote time



//Corn for free plan

cron.schedule('0 0 * * * *',async()=>{
    
    try {
       const updatedUser=await User.updateMany({
        subscriptionPlan:'Free',
            trialExpires:{$lt:new Date()}
        },{
            
           monthlyRequestCount:0

        })
        console.log(updatedUser);
    } catch (error) {
        console.log(error);
    }
}); 
// middleware
app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin: 'http://all-mii2.vercel.app',
    credentials: true,
};

app.use(cors(corsOptions));


//ROuters
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/openai',openAIRouter);
app.use("/api/v1/stripe",stripeRouter);

// Error Handeler
// app.use(errorHandler);


app.listen(process.env.port,()=>{
    console.log("server start");
});