const axios = require("axios");
const asyncHandler = require("express-async-handler");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User"); // Assuming User model is imported
require('dotenv').config();
const openAIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body; 
    console.log("Received prompt:", prompt);
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 100,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.apiKey}` ,
                    "Content-Type": "application/json",
                },
            }
        );
        
        console.log(response);
        
        const content = response?.data?.choices[0]?.message?.content?.trim();
        
        if (!content) {
            return res.status(500).json({ error: "No content received from OpenAI API" });
        }

        const newContent = await ContentHistory.create({
            user: req?.user?.id,
            content,
        });

        // Debugging: Check the user ID
        console.log("User ID from request:", req?.user?.id);

        // Check if the ID is valid
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid( req?.user?.id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Find the user
        const user = await User.findById(req?.user?.id).exec();
        console.log("User found:", user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.contenthistory.push(newContent?._id);

        if (typeof user.contentCount === 'number') {
            user.contentCount += 1;
        } else {
            console.warn("User contentCount is not a number or does not exist");
        }

        await user.save();
        
        res.status(200).json({ content });

    } catch (error) {
        if (error.response) {
            console.error('Error:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('Request Error:', error.request);
            res.status(500).json({ error: "No response from API" });
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
});
module.exports=openAIController;