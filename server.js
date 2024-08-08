const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const dotenv = require("dotenv");
const { errorHandler } = require("./middlewares/errorMiddleware");
const usersRouter = require("./routes/usersRouter");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");

dotenv.config();

const app = express();

// Define allowed origins
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://ai-content-generator-frontend-taupe.vercel.app']
    : ['http://localhost:3000', 'https://ai-content-generator-frontend-taupe.vercel.app'];

// CORS middleware setup
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Cron job
cron.schedule('0 0 * * * *', async () => {
    try {
        const updatedUser = await User.updateMany({
            subscriptionPlan: 'Free',
            trialExpires: { $lt: new Date() }
        }, {
            monthlyRequestCount: 0
        });
        console.log(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

// Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on port", process.env.PORT || 5000);
});
